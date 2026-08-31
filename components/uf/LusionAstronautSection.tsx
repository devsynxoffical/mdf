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
  const tabletRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const mount = canvasMountRef.current;
    if (!container || !mount) return;

    let width = mount.clientWidth || window.innerWidth;
    let height = mount.clientHeight || window.innerHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050508, 0.025);

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    camera.position.set(0, 0, 4.0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.35;
      mount.appendChild(renderer.domElement);
    } catch (e) {
      console.warn("WebGL init error:", e);
      return;
    }

    // 2. Cinematic Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(3, 5, 4);
    scene.add(keyLight);

    const rimCyanLight = new THREE.DirectionalLight(0x38bdf8, 3.0);
    rimCyanLight.position.set(-4, -2, 2);
    scene.add(rimCyanLight);

    const tunnelEmerald = new THREE.PointLight(0x00ffaa, 0, 40);
    tunnelEmerald.position.set(0, 1, -12);
    scene.add(tunnelEmerald);

    const tunnelMagenta = new THREE.PointLight(0xff0077, 0, 40);
    tunnelMagenta.position.set(0, 1, -26);
    scene.add(tunnelMagenta);

    const visorGlint = new THREE.PointLight(0xffffff, 4.5, 6);
    visorGlint.position.set(0.15, 0.7, 1.2);
    scene.add(visorGlint);

    // 3. Earth Background (Rotating Sphere in Deep Space)
    const textureLoader = new THREE.TextureLoader();
    const earthTex = textureLoader.load("/models/lusion/earth_landscape.jpg");
    earthTex.colorSpace = THREE.SRGBColorSpace;
    const earthGeo = new THREE.SphereGeometry(22, 48, 48);
    const earthMat = new THREE.MeshBasicMaterial({
      map: earthTex,
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.75,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthMesh.position.set(0, -4, -8);
    earthMesh.rotation.y = Math.PI * 0.45;
    scene.add(earthMesh);

    // 4. Astronaut 3D Model Group
    const astronautGroup = new THREE.Group();
    // Naturally posed in zero-G: slightly tilted, hands drifting forward
    astronautGroup.position.set(-1.15, -0.1, 0.2);
    astronautGroup.rotation.set(0.12, -0.22, -0.08);
    scene.add(astronautGroup);

    const helmetMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.28,
      metalness: 0.15,
    });
    const suitMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.38,
      metalness: 0.1,
    });
    const visorMat = new THREE.MeshPhysicalMaterial({
      color: 0x05050a,
      metalness: 0.98,
      roughness: 0.04,
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

    const objLoader = new OBJLoader();
    // Load all 4 astronaut sub-meshes and offset by center of mass (y = -0.92) so model centers at (0, 0, 0)
    const loadPart = (url: string, mat: THREE.Material) => {
      objLoader.load(url, (obj) => {
        obj.traverse((c) => {
          if ((c as THREE.Mesh).isMesh) {
            (c as THREE.Mesh).material = mat;
            c.castShadow = true;
          }
        });
        obj.position.y = -0.92;
        astronautGroup.add(obj);
      });
    };

    loadPart("/models/lusion/astronaut_helmet.obj", helmetMat);
    loadPart("/models/lusion/astronaut_helmet_glass.obj", visorMat);
    loadPart("/models/lusion/astronaut_wearpack.obj", suitMat);
    loadPart("/models/lusion/astronaut_glove_shoes.obj", suitMat);

    // 5. Sci-Fi Cyber Grid Tunnel
    const tunnelGroup = new THREE.Group();
    tunnelGroup.visible = false;
    scene.add(tunnelGroup);

    const tunnelMat = new THREE.MeshStandardMaterial({
      color: 0x1e2230,
      metalness: 0.85,
      roughness: 0.35,
    });

    objLoader.load("/models/lusion/tunnel_block_wall.obj", (wall) => {
      wall.traverse((c) => {
        if ((c as THREE.Mesh).isMesh) (c as THREE.Mesh).material = tunnelMat;
      });
      // Build 48m tunnel corridor
      for (let z = -4; z > -52; z -= 6) {
        const left = wall.clone();
        left.position.set(-3.4, 0, z);
        left.scale.set(4, 4, 4);
        tunnelGroup.add(left);

        const right = wall.clone();
        right.position.set(3.4, 0, z);
        right.rotation.y = Math.PI;
        right.scale.set(4, 4, 4);
        tunnelGroup.add(right);

        const top = wall.clone();
        top.position.set(0, 3.2, z);
        top.rotation.z = Math.PI * 0.5;
        top.scale.set(4, 4, 4);
        tunnelGroup.add(top);
      }
    });

    // 6. Exploding Broken Glass Shards
    const glassGroup = new THREE.Group();
    glassGroup.visible = false;
    scene.add(glassGroup);

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x93c5fd,
      transmission: 0.92,
      opacity: 0.85,
      transparent: true,
      roughness: 0.08,
      ior: 1.5,
      thickness: 0.1,
    });

    objLoader.load("/models/lusion/broken_glass.obj", (glassObj) => {
      glassObj.traverse((c) => {
        if ((c as THREE.Mesh).isMesh) (c as THREE.Mesh).material = glassMat;
      });
      glassObj.scale.set(6, 6, 6);
      glassObj.position.set(0, 0, 0.5);
      glassGroup.add(glassObj);
    });

    // 7. Floating 3D Diamonds in Finale
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
        const radius = 2.0 + Math.random() * 2.5;
        clone.position.set(
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 2.8,
          (Math.random() - 0.5) * 2.2
        );
        const s = 0.08 + Math.random() * 0.14;
        clone.scale.set(s, s, s);
        clone.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        diamondsGroup.add(clone);
      }
    });

    // 8. Pinned Scroll Orchestrator
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "+=650%",
      pin: true,
      scrub: 0.8,
      onUpdate: (self) => {
        const p = self.progress;
        setScrollProgress(p);

        // STAGE 1: Tablet View (0.00 -> 0.25)
        if (p < 0.25) {
          const t = p / 0.25;
          earthMesh.visible = true;
          tunnelGroup.visible = false;
          glassGroup.visible = false;
          diamondsGroup.visible = false;

          // Astronaut stays framed inside tablet on left
          astronautGroup.position.set(-1.15 + t * 0.4, -0.1 + t * 0.1, 0.2 + t * 0.5);
          astronautGroup.rotation.set(0.12 - t * 0.06, -0.22 + t * 0.15, -0.08);
          camera.position.set(0, 0, 4.0 - t * 0.4);
        }
        // STAGE 2: Deep Space Breakout into Tunnel (0.25 -> 0.50)
        else if (p < 0.5) {
          const t = (p - 0.25) / 0.25;
          earthMesh.visible = false;
          tunnelGroup.visible = true;
          glassGroup.visible = false;
          diamondsGroup.visible = false;

          // Green/cyan cyber tunnel lights up
          tunnelEmerald.intensity = t * 15;
          tunnelMagenta.intensity = 0;

          // Camera plunges into cyber tunnel
          camera.position.set(0, 0, 3.6 - t * 14);
          astronautGroup.position.set(0, 0, 2.0 - t * 15);
          astronautGroup.rotation.set(0.2 + t * 0.4, -0.07 + t * 0.5, Math.sin(t * Math.PI) * 0.25);
        }
        // STAGE 3: Magenta / Neon Kaleidoscope Vortex (0.50 -> 0.72)
        else if (p < 0.72) {
          const t = (p - 0.5) / 0.22;
          earthMesh.visible = false;
          tunnelGroup.visible = true;
          glassGroup.visible = false;
          diamondsGroup.visible = false;

          // Tunnel lights shift from emerald to hot pink/magenta
          tunnelEmerald.intensity = (1 - t) * 15;
          tunnelMagenta.intensity = t * 18;

          camera.position.set(0, 0, -10.4 - t * 16);
          astronautGroup.position.set(0, 0, -13.0 - t * 16);
          astronautGroup.rotation.set(
            0.6 + t * 0.6,
            0.43 + t * Math.PI,
            Math.cos(t * Math.PI) * 0.35
          );
        }
        // STAGE 4: Monitor Glass Shatter Explosion (0.72 -> 0.86)
        else if (p < 0.86) {
          const t = (p - 0.72) / 0.14;
          earthMesh.visible = false;
          tunnelGroup.visible = false;
          glassGroup.visible = true;
          diamondsGroup.visible = false;

          // Reset camera and astronaut lunges through monitor glass
          camera.position.set(0, 0, 3.8 - t * 0.6);
          astronautGroup.position.set(0, -0.05, 0.4 + t * 1.1);
          astronautGroup.rotation.set(0.05, 0, 0);

          // Glass shards explode outward towards camera
          glassGroup.position.set(0, 0, t * 2.8);
          glassGroup.scale.set(1 + t * 1.8, 1 + t * 1.8, 1 + t * 2.5);
          glassMat.opacity = Math.max(0, 0.95 - t * 0.7);
        }
        // STAGE 5: Grand Finale / Pop Stickers & Diamonds (0.86 -> 1.00)
        else {
          const t = (p - 0.86) / 0.14;
          earthMesh.visible = false;
          tunnelGroup.visible = false;
          glassGroup.visible = false;
          diamondsGroup.visible = true;

          camera.position.set(0, 0, 3.2);
          astronautGroup.position.set(0, Math.sin(t * Math.PI * 2) * 0.06, 1.2);
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
      targetRotY = nx * 0.18;
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

      // Gentle zero-G breathing drift
      astronautGroup.position.y += Math.sin(elapsed * 1.6) * 0.0012;
      astronautGroup.rotation.x += (targetRotX - astronautGroup.rotation.x) * 0.04;
      astronautGroup.rotation.y += (targetRotY - astronautGroup.rotation.y) * 0.04;
      astronautGroup.rotation.z += Math.sin(elapsed * 0.8) * 0.0008;

      if (earthMesh.visible) earthMesh.rotation.y += 0.0012;

      if (diamondsGroup.visible) {
        diamondsGroup.rotation.y = elapsed * 0.22;
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
      id="immersive-astronaut"
      className="relative h-screen w-full overflow-hidden bg-[#050508] text-white select-none"
    >
      {/* Dynamic Chromatic Aberration Vignette Overlay in Tunnel Stages */}
      <div
        className="pointer-events-none absolute inset-0 z-15 transition-opacity duration-700"
        style={{
          opacity: scrollProgress >= 0.25 && scrollProgress < 0.72 ? 0.85 : 0,
          background:
            "radial-gradient(circle at center, transparent 40%, rgba(0, 255, 170, 0.12) 70%, rgba(255, 0, 119, 0.25) 100%)",
        }}
      />

      {/* 3D WebGL Canvas (Active and persistent across the entire section) */}
      <div ref={canvasMountRef} className="absolute inset-0 z-10 pointer-events-none" />

      {/* ── STAGE 1: Sleek Dark iPad Device Mockup (0% -> 25%) ── */}
      <div
        className="absolute inset-0 z-20 flex flex-col md:flex-row items-center justify-between px-8 md:px-20 max-w-[1440px] mx-auto transition-opacity duration-500"
        style={{
          opacity: scrollProgress < 0.23 ? 1 - scrollProgress * 4.2 : 0,
          pointerEvents: scrollProgress < 0.2 ? "auto" : "none",
        }}
      >
        {/* Left: Beautiful iPad Bezel Frame */}
        <div
          ref={tabletRef}
          className="relative w-full max-w-[560px] aspect-[4/3] flex items-center justify-center rounded-[32px] sm:rounded-[40px] border-[10px] sm:border-[14px] border-[#18181b] shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.08)] bg-transparent overflow-hidden transition-transform duration-500"
          style={{
            transform: `scale(${1 + scrollProgress * 0.9})`,
          }}
        >
          {/* Front camera lens sensor */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#27272a] shadow-inner" />
          {/* Subtle screen inner gloss reflection */}
          <div className="pointer-events-none absolute inset-0 rounded-[22px] border border-white/10 bg-gradient-to-tr from-white/[0.03] via-transparent to-white/[0.05]" />
        </div>

        {/* Right: Editorial Typography */}
        <div className="w-full md:max-w-[540px] text-left pt-6 md:pt-0">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-cyan-400 font-semibold">
            INNOVATION & 3D CRAFT
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

      {/* ── STAGE 2 & 3: Tunnel Plunge Titles (25% -> 72%) ── */}
      <div
        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 transition-opacity duration-500 pointer-events-none"
        style={{
          opacity:
            scrollProgress >= 0.25 && scrollProgress < 0.72
              ? Math.sin(((scrollProgress - 0.25) / 0.47) * Math.PI)
              : 0,
        }}
      >
        <p className="font-mono text-[12px] uppercase tracking-[0.35em] text-cyan-400 mb-4 font-semibold">
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

      {/* ── STAGE 4: Desktop Monitor Shatter Frame (72% -> 86%) ── */}
      <div
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none transition-opacity duration-500"
        style={{
          opacity:
            scrollProgress >= 0.72 && scrollProgress < 0.86
              ? Math.sin(((scrollProgress - 0.72) / 0.14) * Math.PI)
              : 0,
        }}
      >
        <div className="relative w-[90vw] max-w-[1100px] aspect-[16/10] rounded-[24px] border-[12px] border-[#18181b] shadow-[0_30px_90px_rgba(0,0,0,0.95)] bg-transparent overflow-hidden">
          <div className="absolute inset-0 rounded-[12px] border border-white/10 bg-gradient-to-br from-cyan-500/10 via-transparent to-pink-500/10" />
        </div>
      </div>

      {/* ── STAGE 5: Finale Climax & Pop Stickers (86% -> 100%) ── */}
      <div
        className="absolute inset-0 z-20 flex flex-col items-center justify-between py-12 md:py-16 px-6 text-center transition-opacity duration-500"
        style={{
          opacity: scrollProgress >= 0.86 ? (scrollProgress - 0.86) / 0.14 : 0,
          pointerEvents: scrollProgress >= 0.86 ? "auto" : "none",
        }}
      >
        {/* Floating Pop-Art Stickers */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {STICKER_ICONS.map((stk, idx) => (
            <div
              key={idx}
              className="absolute transition-transform duration-700"
              style={{
                left: `calc(50% + ${stk.x}vw)`,
                top: `calc(50% + ${stk.y}vh)`,
                transform: `rotate(${stk.rot}deg) scale(${stk.scale * (scrollProgress >= 0.86 ? 1 : 0.3)})`,
                opacity: scrollProgress >= 0.86 ? 0.95 : 0,
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

      {/* ── LUSION MINI PICTURE-IN-PICTURE PREVIEW (Bottom Right) ── */}
      <div
        className="pointer-events-none absolute bottom-6 right-6 z-30 hidden md:block overflow-hidden rounded-lg border border-white/20 bg-black/60 p-1 shadow-2xl backdrop-blur-md transition-all duration-500"
        style={{
          opacity: scrollProgress > 0.05 && scrollProgress < 0.96 ? 0.9 : 0,
        }}
      >
        <div className="relative h-[82px] w-[140px] overflow-hidden rounded bg-black/80">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={
              scrollProgress < 0.35
                ? "/models/lusion/earth_landscape.jpg"
                : scrollProgress < 0.75
                ? "/models/lusion/white_block.webp"
                : "/models/lusion/stickers.png"
            }
            alt="PiP Preview"
            className="h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-[9px] uppercase tracking-wider text-cyan-300 bg-black/70 px-1.5 py-0.5 rounded font-semibold">
              {scrollProgress < 0.25
                ? "EXPERIENCE"
                : scrollProgress < 0.5
                ? "CYBER TUNNEL"
                : scrollProgress < 0.72
                ? "KALEIDOSCOPE"
                : "GLASS SHATTER"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
