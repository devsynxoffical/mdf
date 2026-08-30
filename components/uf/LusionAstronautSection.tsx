"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STICKER_ICONS = [
  { src: "/models/lusion/stickers.png", x: -28, y: -22, rot: -15, scale: 0.9 },
  { src: "/models/lusion/stickers.png", x: 26, y: -18, rot: 20, scale: 0.85 },
  { src: "/models/lusion/stickers.png", x: -32, y: 15, rot: 25, scale: 1.1 },
  { src: "/models/lusion/stickers.png", x: 30, y: 22, rot: -20, scale: 1.0 },
  { src: "/models/lusion/stickers.png", x: -14, y: 32, rot: 10, scale: 0.75 },
  { src: "/models/lusion/stickers.png", x: 18, y: 34, rot: -30, scale: 0.95 },
];

export default function LusionAstronautSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasMountRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const mount = canvasMountRef.current;
    if (!container || !mount) return;

    let width = mount.clientWidth || window.innerWidth;
    let height = mount.clientHeight || window.innerHeight;

    // 1. Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050508, 0.035);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 1.3, 4.2);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
      mount.appendChild(renderer.domElement);
    } catch (e) {
      console.warn("WebGL failed:", e);
      return;
    }

    // 2. Dynamic Lighting for Tunnel & Deep Space
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0x38bdf8, 3.0);
    mainKeyLight.position.set(4, 6, 5);
    scene.add(mainKeyLight);

    const tunnelFillLight = new THREE.PointLight(0x00ffaa, 0, 30);
    tunnelFillLight.position.set(0, 2, -15);
    scene.add(tunnelFillLight);

    const tunnelMagentaLight = new THREE.PointLight(0xff0077, 0, 30);
    tunnelMagentaLight.position.set(0, 2, -30);
    scene.add(tunnelMagentaLight);

    const visorGlintLight = new THREE.PointLight(0xffffff, 4.0, 10);
    visorGlintLight.position.set(0.3, 1.8, 1.5);
    scene.add(visorGlintLight);

    // 3. Earth Background (Scene 1)
    const textureLoader = new THREE.TextureLoader();
    const earthTex = textureLoader.load("/models/lusion/earth_landscape.jpg");
    earthTex.colorSpace = THREE.SRGBColorSpace;
    const earthGeo = new THREE.SphereGeometry(24, 48, 48);
    const earthMat = new THREE.MeshBasicMaterial({
      map: earthTex,
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.7,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthMesh.position.set(0, -6, -10);
    earthMesh.rotation.y = Math.PI * 0.45;
    scene.add(earthMesh);

    // 4. Sci-Fi Tunnel Corridors (tunnel_block_wall instances)
    const tunnelGroup = new THREE.Group();
    tunnelGroup.visible = false;
    scene.add(tunnelGroup);

    const tunnelMat = new THREE.MeshStandardMaterial({
      color: 0x222630,
      metalness: 0.85,
      roughness: 0.35,
    });

    const objLoader = new OBJLoader();
    objLoader.load("/models/lusion/tunnel_block_wall.obj", (wallObj) => {
      wallObj.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          (child as THREE.Mesh).material = tunnelMat;
        }
      });

      // Construct a 60-meter long cyber tunnel corridor
      for (let z = -5; z > -65; z -= 8) {
        // Left wall
        const left = wallObj.clone();
        left.position.set(-3.2, 0, z);
        left.scale.set(0.012, 0.012, 0.012);
        tunnelGroup.add(left);

        // Right wall
        const right = wallObj.clone();
        right.position.set(3.2, 0, z);
        right.rotation.y = Math.PI;
        right.scale.set(0.012, 0.012, 0.012);
        tunnelGroup.add(right);

        // Ceiling grid
        const ceiling = wallObj.clone();
        ceiling.position.set(0, 3.5, z);
        ceiling.rotation.z = Math.PI * 0.5;
        ceiling.scale.set(0.012, 0.012, 0.012);
        tunnelGroup.add(ceiling);
      }
    });

    // 5. Astronaut 3D Model
    const astronautGroup = new THREE.Group();
    astronautGroup.position.set(0, 0, 0);
    scene.add(astronautGroup);

    const helmetMat = new THREE.MeshStandardMaterial({
      roughness: 0.25,
      metalness: 0.1,
      color: 0xf3f4f6,
    });
    const suitMat = new THREE.MeshStandardMaterial({
      roughness: 0.4,
      metalness: 0.05,
      color: 0xe5e7eb,
    });
    const visorMat = new THREE.MeshPhysicalMaterial({
      color: 0x050508,
      metalness: 0.98,
      roughness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 1.0,
    });

    textureLoader.load("/models/lusion/astronaut_helmet_base.webp", (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      helmetMat.map = tex;
      helmetMat.needsUpdate = true;
    });
    textureLoader.load("/models/lusion/astronaut_wearpack_base.webp", (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      suitMat.map = tex;
      suitMat.needsUpdate = true;
    });

    objLoader.load("/models/lusion/astronaut_helmet.obj", (obj) => {
      obj.traverse((c) => {
        if ((c as THREE.Mesh).isMesh) (c as THREE.Mesh).material = helmetMat;
      });
      astronautGroup.add(obj);
    });
    objLoader.load("/models/lusion/astronaut_helmet_glass.obj", (obj) => {
      obj.traverse((c) => {
        if ((c as THREE.Mesh).isMesh) (c as THREE.Mesh).material = visorMat;
      });
      astronautGroup.add(obj);
    });
    objLoader.load("/models/lusion/astronaut_wearpack.obj", (obj) => {
      obj.traverse((c) => {
        if ((c as THREE.Mesh).isMesh) (c as THREE.Mesh).material = suitMat;
      });
      astronautGroup.add(obj);
    });
    objLoader.load("/models/lusion/astronaut_glove_shoes.obj", (obj) => {
      obj.traverse((c) => {
        if ((c as THREE.Mesh).isMesh) (c as THREE.Mesh).material = suitMat;
      });
      astronautGroup.add(obj);
    });

    // 6. Exploding Broken Glass Shards (Screenshot 5)
    const glassGroup = new THREE.Group();
    glassGroup.visible = false;
    scene.add(glassGroup);

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x88ccff,
      transmission: 0.95,
      opacity: 0.85,
      transparent: true,
      roughness: 0.1,
      ior: 1.52,
      thickness: 0.05,
    });

    let glassPieces: THREE.Mesh[] = [];
    objLoader.load("/models/lusion/broken_glass.obj", (obj) => {
      obj.traverse((c) => {
        if ((c as THREE.Mesh).isMesh) {
          (c as THREE.Mesh).material = glassMat;
          glassPieces.push(c as THREE.Mesh);
        }
      });
      obj.scale.set(0.015, 0.015, 0.015);
      obj.position.set(0, 1.2, 0.8);
      glassGroup.add(obj);
    });

    // 7. Floating 3D Diamonds (Screenshot 3 & Finale)
    const diamondsGroup = new THREE.Group();
    diamondsGroup.visible = false;
    scene.add(diamondsGroup);

    const diamondMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.95,
      opacity: 1,
      transparent: true,
      roughness: 0.02,
      ior: 2.4,
    });

    objLoader.load("/models/lusion/diamond.obj", (diamondObj) => {
      diamondObj.traverse((c) => {
        if ((c as THREE.Mesh).isMesh) (c as THREE.Mesh).material = diamondMat;
      });
      for (let i = 0; i < 22; i++) {
        const clone = diamondObj.clone();
        const angle = (i / 22) * Math.PI * 2;
        const radius = 2.0 + Math.random() * 2.8;
        clone.position.set(
          Math.cos(angle) * radius,
          1.2 + (Math.random() - 0.5) * 2.6,
          (Math.random() - 0.5) * 2.5
        );
        const s = 0.08 + Math.random() * 0.14;
        clone.scale.set(s, s, s);
        clone.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        diamondsGroup.add(clone);
      }
    });

    // 8. Master Pinned GSAP ScrollTrigger
    let progressVal = 0;
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "+=550%",
      pin: true,
      scrub: 0.8,
      onUpdate: (self) => {
        progressVal = self.progress;
        setScrollProgress(progressVal);

        // STAGE 1: Tablet Mockup & Deep Space Visor Flare (0.00 -> 0.22)
        if (progressVal < 0.22) {
          const t = progressVal / 0.22;
          earthMesh.visible = true;
          tunnelGroup.visible = false;
          glassGroup.visible = false;
          diamondsGroup.visible = false;

          astronautGroup.position.set(-1.1 + t * 1.1, -0.2 + t * 0.2, t * 0.4);
          astronautGroup.rotation.set(0, (1 - t) * 0.25, 0);
          camera.position.set(0, 1.4, 4.2 - t * 0.6);
        }
        // STAGE 2: Sci-Fi Cyber Grid Tunnel Plunge (0.22 -> 0.45)
        else if (progressVal < 0.45) {
          const t = (progressVal - 0.22) / 0.23;
          earthMesh.visible = false;
          tunnelGroup.visible = true;
          glassGroup.visible = false;
          diamondsGroup.visible = false;

          // Tunnel lights up cyan/emerald
          tunnelFillLight.intensity = t * 12;
          tunnelMagentaLight.intensity = 0;

          // Camera plunges deep into the tunnel, astronaut floats backwards in corridor
          camera.position.set(0, 1.5, 3.6 - t * 14);
          astronautGroup.position.set(0, 1.2, 2.0 - t * 15);
          astronautGroup.rotation.set(t * 0.4, Math.PI + t * 0.6, Math.sin(t * Math.PI) * 0.3);
        }
        // STAGE 3: Magenta / Neon Kaleidoscope Grid Vortex (0.45 -> 0.68)
        else if (progressVal < 0.68) {
          const t = (progressVal - 0.45) / 0.23;
          earthMesh.visible = false;
          tunnelGroup.visible = true;
          glassGroup.visible = false;
          diamondsGroup.visible = false;

          // Tunnel shifts from green to intense neon magenta/purple
          tunnelFillLight.intensity = (1 - t) * 12;
          tunnelMagentaLight.intensity = t * 16;

          camera.position.set(0, 1.5, -10.4 - t * 16);
          astronautGroup.position.set(0, 1.1, -13.0 - t * 16);
          astronautGroup.rotation.set(
            0.4 + t * 0.8,
            Math.PI + 0.6 + t * Math.PI,
            Math.cos(t * Math.PI) * 0.4
          );
        }
        // STAGE 4: Desktop Monitor Shatter & Glass Explosion (0.68 -> 0.84)
        else if (progressVal < 0.84) {
          const t = (progressVal - 0.68) / 0.16;
          earthMesh.visible = false;
          tunnelGroup.visible = false;
          glassGroup.visible = true;
          diamondsGroup.visible = false;

          // Reset camera to front of desktop
          camera.position.set(0, 1.4, 4.0 - t * 0.8);
          astronautGroup.position.set(0, 0.1, 0.4 + t * 1.0);
          astronautGroup.rotation.set(-0.1, 0, 0);

          // Glass shards explode towards camera
          glassGroup.position.set(0, 0, t * 2.2);
          glassGroup.scale.set(1 + t * 1.5, 1 + t * 1.5, 1 + t * 2.0);
          glassMat.opacity = Math.max(0, 0.9 - t * 0.6);
        }
        // STAGE 5: Grand Finale / Pop Stickers & 3D Diamonds Climax (0.84 -> 1.00)
        else {
          const t = (progressVal - 0.84) / 0.16;
          earthMesh.visible = false;
          tunnelGroup.visible = false;
          glassGroup.visible = false;
          diamondsGroup.visible = true;

          camera.position.set(0, 1.4, 3.4);
          astronautGroup.position.set(0, 0.1 + Math.sin(t * Math.PI * 2) * 0.05, 1.2);
          astronautGroup.rotation.set(0, Math.sin(t * Math.PI) * 0.25, 0);
        }
      },
    });

    // 9. Mouse Parallax
    let targetRotX = 0;
    let targetRotY = 0;
    const onMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetRotY = nx * 0.2;
      targetRotX = ny * 0.1;
    };
    window.addEventListener("mousemove", onMouseMove);

    // 10. Resize
    const onResize = () => {
      width = mount.clientWidth || window.innerWidth;
      height = mount.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    // 11. Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Zero-G breathing floating oscillation
      astronautGroup.position.y += Math.sin(elapsed * 1.8) * 0.0012;
      astronautGroup.rotation.x += (targetRotX - astronautGroup.rotation.x) * 0.05;
      astronautGroup.rotation.z += Math.sin(elapsed * 0.9) * 0.001;

      // Rotate Earth slowly in Scene 1
      if (earthMesh.visible) earthMesh.rotation.y += 0.001;

      // Rotate floating diamonds in Finale
      if (diamondsGroup.visible) {
        diamondsGroup.rotation.y = elapsed * 0.2;
        diamondsGroup.children.forEach((child) => {
          child.rotation.x += 0.015;
          child.rotation.y += 0.02;
        });
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      trigger.kill();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="lusion-experience"
      className="relative h-screen w-full overflow-hidden bg-[#050508] text-white select-none"
    >
      {/* Dynamic Chromatic Aberration Vignette Overlay (Screenshot 2, 3, 4) */}
      <div
        className="pointer-events-none absolute inset-0 z-15 transition-opacity duration-500"
        style={{
          opacity: scrollProgress >= 0.2 && scrollProgress < 0.7 ? 0.85 : 0,
          background:
            "radial-gradient(circle at center, transparent 40%, rgba(0, 255, 170, 0.12) 70%, rgba(255, 0, 119, 0.22) 100%)",
        }}
      />

      {/* 3D WebGL Canvas */}
      <div ref={canvasMountRef} className="absolute inset-0 z-10 pointer-events-none" />

      {/* ── STAGE 1: Tablet Device Frame (0% -> 22%) ── */}
      <div
        className="absolute inset-0 z-20 flex flex-col md:flex-row items-center justify-between px-8 md:px-20 max-w-[1440px] mx-auto transition-opacity duration-500"
        style={{
          opacity: scrollProgress < 0.2 ? 1 - scrollProgress * 5 : 0,
          pointerEvents: scrollProgress < 0.18 ? "auto" : "none",
        }}
      >
        <div className="relative w-full max-w-[560px] aspect-[4/3] flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/models/lusion/tablet.png"
            alt="Tablet Bezel"
            className="w-full h-full object-contain pointer-events-none drop-shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
            style={{ transform: `scale(${1 + scrollProgress * 0.9})` }}
          />
        </div>

        <div className="w-full md:max-w-[540px] text-left pt-6 md:pt-0">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-cyan-400">
            LUSION IMMERSIVE LABS
          </span>
          <h2 className="mt-3 font-sans text-[clamp(32px,5vw,64px)] font-extrabold tracking-tight leading-[0.96] text-white">
            Become Immersive <br />
            <span className="text-cyan-300">Experiences</span>
          </h2>
          <div className="mt-6 space-y-4 text-white/70 font-sans text-[14px] md:text-[16px] leading-relaxed">
            <p>
              We do not chase trends or produce work that looks like everyone else.
              We focus on creating visually distinctive digital experiences that
              reflect your brand, engage your audience, and make people remember
              what they saw.
            </p>
            <p>
              Our process blends creative direction, 3D craft, and interactive
              development to build tailored digital journeys that feel original,
              polished, and built for impact.
            </p>
          </div>
        </div>
      </div>

      {/* ── STAGE 2 & 3: Tunnel Plunge Subtitles (22% -> 68%) ── */}
      <div
        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 transition-opacity duration-500 pointer-events-none"
        style={{
          opacity:
            scrollProgress >= 0.22 && scrollProgress < 0.68
              ? Math.sin(((scrollProgress - 0.22) / 0.46) * Math.PI)
              : 0,
        }}
      >
        <p className="font-mono text-[12px] uppercase tracking-[0.35em] text-cyan-400 mb-4">
          DEEP SPACE CYBER TUNNEL
        </p>
        <h3 className="font-sans font-black text-[clamp(40px,7.5vw,96px)] tracking-tight leading-[0.92] text-white max-w-[950px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)]">
          Step into a new world <br />
          and let your <br />
          <span className="bg-gradient-to-r from-cyan-400 via-emerald-300 to-pink-500 bg-clip-text text-transparent">
            imagination run wild
          </span>
        </h3>
      </div>

      {/* ── STAGE 4: Desktop Monitor Shatter Frame (68% -> 84%) ── */}
      <div
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none transition-opacity duration-500"
        style={{
          opacity:
            scrollProgress >= 0.68 && scrollProgress < 0.84
              ? Math.sin(((scrollProgress - 0.68) / 0.16) * Math.PI)
              : 0,
        }}
      >
        <div className="relative w-[90vw] max-w-[1100px] aspect-[16/10]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/models/lusion/desktop.png"
            alt="Desktop Monitor Breakout"
            className="w-full h-full object-contain drop-shadow-[0_30px_70px_rgba(0,0,0,0.95)]"
          />
        </div>
      </div>

      {/* ── STAGE 5: Finale Climax & Pop Stickers (84% -> 100%) ── */}
      <div
        className="absolute inset-0 z-20 flex flex-col items-center justify-between py-12 md:py-16 px-6 text-center transition-opacity duration-500"
        style={{
          opacity: scrollProgress >= 0.84 ? (scrollProgress - 0.84) / 0.16 : 0,
          pointerEvents: scrollProgress >= 0.84 ? "auto" : "none",
        }}
      >
        {/* Floating Pop Stickers */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {STICKER_ICONS.map((stk, idx) => (
            <div
              key={idx}
              className="absolute transition-transform duration-700"
              style={{
                left: `calc(50% + ${stk.x}vw)`,
                top: `calc(50% + ${stk.y}vh)`,
                transform: `rotate(${stk.rot}deg) scale(${stk.scale * (scrollProgress >= 0.84 ? 1 : 0.3)})`,
                opacity: scrollProgress >= 0.84 ? 0.95 : 0,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={stk.src}
                alt="Sticker"
                className="w-24 md:w-36 h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
              />
            </div>
          ))}
        </div>

        <div className="relative z-30">
          <span className="font-mono text-[11px] md:text-[13px] uppercase tracking-[0.28em] text-cyan-400 font-semibold">
            IS YOUR BIG IDEA READY TO GO WILD?
          </span>
        </div>

        <div className="relative z-30 my-auto">
          <h2 className="font-sans font-black text-[clamp(52px,10vw,140px)] tracking-[-0.03em] leading-[0.88] text-white drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)]">
            Let&apos;s work <br />
            <span className="bg-gradient-to-r from-white via-cyan-200 to-sky-400 bg-clip-text text-transparent">
              together!
            </span>
          </h2>
        </div>

        <div className="relative z-30">
          <a
            href="#door"
            className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 font-mono text-[11px] md:text-[12px] uppercase tracking-[0.25em] text-white backdrop-blur-md transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400 hover:text-black shadow-lg"
          >
            <span>↓</span>
            <span>CONTINUE TO SCROLL</span>
            <span>↓</span>
          </a>
        </div>
      </div>

      {/* ── AUTHENTIC LUSION MINI PICTURE-IN-PICTURE PREVIEW (Bottom Right) ── */}
      <div
        className="pointer-events-none absolute bottom-6 right-6 z-30 hidden md:block overflow-hidden rounded-lg border border-white/20 bg-black/60 p-1 shadow-2xl backdrop-blur-md transition-all duration-500"
        style={{
          opacity: scrollProgress > 0.08 && scrollProgress < 0.96 ? 0.9 : 0,
        }}
      >
        <div className="relative h-[82px] w-[140px] overflow-hidden rounded bg-black/80">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={
              scrollProgress < 0.4
                ? "/models/lusion/earth_landscape.jpg"
                : scrollProgress < 0.75
                ? "/models/lusion/desktop.png"
                : "/models/lusion/stickers.png"
            }
            alt="PiP Preview"
            className="h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-[9px] uppercase tracking-wider text-cyan-300 bg-black/60 px-1.5 py-0.5 rounded">
              {scrollProgress < 0.25
                ? "EXPERIENCE"
                : scrollProgress < 0.55
                ? "CYBER TUNNEL"
                : scrollProgress < 0.75
                ? "KALEIDOSCOPE"
                : "GLASS SHATTER"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
