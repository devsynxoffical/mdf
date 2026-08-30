"use client";

import { useEffect, useState, useRef, useCallback } from "react";

// Global audio state & nodes
let actx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let sfxBus: GainNode | null = null;
let analyser: AnalyserNode | null = null;
let noiseBuffer: AudioBuffer | null = null;
let lastGrainTime = 0;
let soundEnabled = false;

function initAudioContext() {
  if (actx) {
    if (actx.state === "suspended") {
      actx.resume().catch(() => {});
    }
    return;
  }

  const AC =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AC) return;

  actx = new AC();
  masterGain = actx.createGain();
  masterGain.gain.value = 1;

  const comp = actx.createDynamicsCompressor();
  comp.threshold.value = -20;
  comp.ratio.value = 6;
  masterGain.connect(comp);
  comp.connect(actx.destination);

  sfxBus = actx.createGain();
  sfxBus.gain.value = 1.6;
  sfxBus.connect(masterGain);

  analyser = actx.createAnalyser();
  analyser.fftSize = 64;
  analyser.smoothingTimeConstant = 0.75;
  comp.connect(analyser);

  // Generate white noise buffer for mechanical switch clicks
  noiseBuffer = actx.createBuffer(1, actx.sampleRate * 0.6, actx.sampleRate);
  const data = noiseBuffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = Math.random() * 2 - 1;
  }
}

/**
 * Mechanical typing "crick-crick" switch sound (from hire.unickfunnel.com)
 */
export function playTypingClick(intensity = 0.6) {
  if (!soundEnabled || !actx || !sfxBus || !noiseBuffer) return;
  if (actx.state !== "running") return;

  const now = performance.now();
  if (now - lastGrainTime < 38) return; // Prevent audio clipping
  lastGrainTime = now;

  const t = actx.currentTime;
  const n = 1 + (Math.random() < intensity ? 1 : 0);

  for (let i = 0; i < n; i++) {
    const src = actx.createBufferSource();
    src.buffer = noiseBuffer;

    const bp = actx.createBiquadFilter();
    bp.type = "bandpass";
    bp.Q.value = 2.4;
    bp.frequency.value = 1800 + Math.random() * 1900;

    const g = actx.createGain();
    const t0 = t + i * 0.024;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(
      0.025 + 0.03 * Math.min(1, intensity),
      t0 + 0.006
    );
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.035);

    src.connect(bp);
    bp.connect(g);
    g.connect(sfxBus);

    src.start(t0);
    src.stop(t0 + 0.045);
  }
}

/**
 * Clean UI click sound
 */
export function playClick() {
  if (!soundEnabled || !actx || !sfxBus) return;
  if (actx.state !== "running") return;

  const t = actx.currentTime;
  const o = actx.createOscillator();
  o.type = "triangle";
  o.frequency.setValueAtTime(540, t);
  o.frequency.exponentialRampToValueAtTime(470, t + 0.07);

  const g = actx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.09, t + 0.006);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);

  o.connect(g);
  g.connect(sfxBus);
  o.start(t);
  o.stop(t + 0.12);
}

/**
 * Clean minimal tick sound (delicate haptic tap, no noise/grain)
 */
export function playTick() {
  if (!soundEnabled || !actx || !sfxBus) return;
  if (actx.state !== "running") return;

  const t = actx.currentTime;
  const o = actx.createOscillator();
  o.type = "sine";
  o.frequency.setValueAtTime(1400, t);
  o.frequency.exponentialRampToValueAtTime(850, t + 0.016);

  const g = actx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.04, t + 0.002);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.018);

  o.connect(g);
  g.connect(sfxBus);
  o.start(t);
  o.stop(t + 0.024);
}

// Atmospheric continuous wind loop nodes
let windSrc: AudioBufferSourceNode | null = null;
let windLP: BiquadFilterNode | null = null;
let windWhistle: BiquadFilterNode | null = null;
let windGain: GainNode | null = null;
let windPan: StereoPannerNode | null = null;

function windStart() {
  if (!soundEnabled || !actx || !noiseBuffer || windSrc) return;

  windSrc = actx.createBufferSource();
  windSrc.buffer = noiseBuffer;
  windSrc.loop = true;

  windLP = actx.createBiquadFilter();
  windLP.type = "lowpass";
  windLP.frequency.value = 480;
  windLP.Q.value = 0.3;

  windWhistle = actx.createBiquadFilter();
  windWhistle.type = "bandpass";
  windWhistle.frequency.value = 880;
  windWhistle.Q.value = 2.4;

  const whistleG = actx.createGain();
  whistleG.gain.value = 0.35;

  windGain = actx.createGain();
  windGain.gain.value = 0;

  // Gentle flutter oscillator for natural air draft dynamics
  const flut = actx.createOscillator();
  flut.frequency.value = 0.9;
  const flutG = actx.createGain();
  flutG.gain.value = 0.014;
  flut.connect(flutG);
  flutG.connect(windGain.gain);
  flut.start();

  windSrc.connect(windLP);
  windLP.connect(windGain);

  windSrc.connect(windWhistle);
  windWhistle.connect(whistleG);
  whistleG.connect(windGain);

  if (actx.createStereoPanner) {
    windPan = actx.createStereoPanner();
    windGain.connect(windPan);
    windPan.connect(sfxBus!);
  } else {
    windGain.connect(sfxBus!);
  }

  windSrc.start();
}

/**
 * Atmospheric reactive wind sound triggered by cursor velocity (matching hire.unickfunnel.com)
 */
export function playWindMove(speed: number, panNorm = 0) {
  if (!soundEnabled || !actx || actx.state !== "running") return;
  if (!windSrc) {
    windStart();
    if (!windSrc || !windGain || !windLP || !windWhistle) return;
  }

  const t = actx.currentTime;
  const target = Math.min(0.085, 0.008 + speed * 0.014);
  windGain!.gain.cancelScheduledValues(t);
  windGain!.gain.setTargetAtTime(target, t, 0.07);
  windGain!.gain.setTargetAtTime(0, t + 0.18, 0.35); // Gently settles to silence if mouse rests

  windLP!.frequency.setTargetAtTime(420 + Math.min(700, speed * 95), t, 0.1);
  windWhistle!.frequency.setTargetAtTime(760 + Math.min(900, speed * 120), t, 0.12);

  if (windPan) {
    windPan.pan.setTargetAtTime(Math.max(-1, Math.min(1, panNorm)), t, 0.1);
  }
}

export function stopWind() {
  if (!windGain || !actx) return;
  const t = actx.currentTime;
  windGain.gain.cancelScheduledValues(t);
  windGain.gain.setTargetAtTime(0, t, 0.14);
}

// Attach globally for window-level listeners
if (typeof window !== "undefined") {
  (window as unknown as {
    __sfx: {
      grain: typeof playTypingClick;
      click: typeof playClick;
      wind: typeof playWindMove;
      stopWind: typeof stopWind;
    };
  }).__sfx = {
    grain: playTypingClick,
    click: playClick,
    wind: playWindMove,
    stopWind,
  };
}

/**
 * Floating Sound Toggle Equalizer Pill (matching hire.unickfunnel.com)
 */
export default function SoundToggle() {
  const [isOn, setIsOn] = useState(false);
  const barRefs = useRef<(HTMLElement | null)[]>([]);
  const animFrameRef = useRef<number | null>(null);

  const toggleSound = useCallback(() => {
    initAudioContext();
    const nextState = !isOn;
    setIsOn(nextState);
    soundEnabled = nextState;

    if (nextState) {
      playClick();
      try {
        sessionStorage.setItem("uf-sound", "on");
      } catch {}
    } else {
      try {
        sessionStorage.setItem("uf-sound", "off");
      } catch {}
    }
  }, [isOn]);

  // Audio spectrum visualizer for the equalizer bars
  useEffect(() => {
    if (!isOn) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      barRefs.current.forEach((bar, i) => {
        if (bar) {
          const heights = [7, 14, 5, 11, 8];
          bar.style.height = `${heights[i]}px`;
        }
      });
      return;
    }

    const dataArray = analyser ? new Uint8Array(analyser.frequencyBinCount) : null;
    const picks = [1, 3, 6, 10, 16];

    const drawBars = () => {
      if (analyser && dataArray) {
        analyser.getByteFrequencyData(dataArray);
        barRefs.current.forEach((bar, i) => {
          if (bar) {
            const v = dataArray[picks[i]] / 255;
            const h = Math.max(4, 4 + v * 18);
            bar.style.height = `${h}px`;
          }
        });
      }
      animFrameRef.current = requestAnimationFrame(drawBars);
    };

    animFrameRef.current = requestAnimationFrame(drawBars);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isOn]);

  // Auto-unlock audio on first gesture if previously turned on
  useEffect(() => {
    const saved = typeof window !== "undefined" ? sessionStorage.getItem("uf-sound") : null;
    const shouldEnable = saved === "on" || saved === null; // Default to on

    if (shouldEnable) {
      const unlock = () => {
        initAudioContext();
        setIsOn(true);
        soundEnabled = true;
        window.removeEventListener("pointerdown", unlock);
        window.removeEventListener("scroll", unlock);
      };
      window.addEventListener("pointerdown", unlock, { once: true });
      window.addEventListener("scroll", unlock, { once: true });
    }
  }, []);

  return (
    <button
      id="soundBtn"
      onClick={toggleSound}
      aria-label="Toggle sound"
      aria-pressed={isOn}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full border px-4 py-2.5 backdrop-blur-md transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:scale-105 ${
        isOn
          ? "border-sky/40 bg-[#0B2256]/90 text-white shadow-[0_0_20px_rgba(56,189,248,0.25)]"
          : "border-white/15 bg-slate-950/80 text-slate-400 hover:text-white"
      }`}
    >
      {/* 5-Bar Equalizer */}
      <span className="flex items-center gap-[3px] h-5" aria-hidden="true">
        {[7, 14, 5, 11, 8].map((h, i) => (
          <i
            key={i}
            ref={(el) => {
              barRefs.current[i] = el;
            }}
            style={{ height: `${h}px` }}
            className={`block w-[2.5px] rounded-full transition-[height] duration-75 ${
              isOn ? "bg-sky shadow-[0_0_6px_#38BDF8]" : "bg-slate-500"
            }`}
          />
        ))}
      </span>

      {/* Label */}
      <span className="font-sans text-[10px] font-bold uppercase tracking-[0.18em]">
        {isOn ? "ON" : "SOUND"}
      </span>
    </button>
  );
}
