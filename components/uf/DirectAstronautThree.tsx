"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DirectAstronautThree() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020617);
    scene.fog = new THREE.FogExp2(0x020617, 0.035);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.45, 4.6);
    camera.lookAt(0, 0.45, 0);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;

    // 3. Cinematic Studio & Cyber Lighting
    const ambientLight = new THREE.AmbientLight(0xd5e8ff, 1.1);
    scene.add(ambientLight);

    // Key front light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(2.5, 3.5, 4.0);
    scene.add(keyLight);

    // Electric Cyan Rim Light (Lusion trademark glow)
    const cyanRim = new THREE.DirectionalLight(0x38bdf8, 3.5);
    cyanRim.position.set(-3.5, 1.5, -2.5);
    scene.add(cyanRim);

    // Electric Magenta Accent Light
    const magentaRim = new THREE.DirectionalLight(0xf43f5e, 2.2);
    magentaRim.position.set(3.0, -2.0, -2.0);
    scene.add(magentaRim);

    // 4. Cyber Grid Tunnel
    const tunnelRadius = 3.6;
    const tunnelLength = 40;
    const tunnelGeo = new THREE.CylinderGeometry(
      tunnelRadius,
      tunnelRadius,
      tunnelLength,
      32,
      60,
      true
    );
    tunnelGeo.rotateX(Math.PI / 2);

    const tunnelMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const tunnel = new THREE.Mesh(tunnelGeo, tunnelMat);
    tunnel.position.z = -10;
    scene.add(tunnel);

    // 5. Glowing Tunnel Rings
    const ringsGroup = new THREE.Group();
    const ringCount = 14;
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.45,
    });
    for (let i = 0; i < ringCount; i++) {
      const ringGeo = new THREE.TorusGeometry(tunnelRadius - 0.05, 0.025, 8, 48);
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.z = 2 - i * 3;
      ringsGroup.add(ringMesh);
    }
    scene.add(ringsGroup);

    // 6. Zero-G Drifting Star Dust / Particles
    const particleCount = 700;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 30;
    }
    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    const particleMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.035,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 7. Shattered Crystal Glass Shards
    const shardsGroup = new THREE.Group();
    const shardCount = 45;
    const shardGeo = new THREE.TetrahedronGeometry(0.12, 0);
    const shardMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.9,
      thickness: 0.5,
      transparent: true,
      opacity: 0.75,
      reflectivity: 0.9,
    });
    for (let i = 0; i < shardCount; i++) {
      const shard = new THREE.Mesh(shardGeo, shardMat);
      shard.position.set(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 10
      );
      shard.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      shard.scale.setScalar(0.5 + Math.random() * 1.5);
      shardsGroup.add(shard);
    }
    scene.add(shardsGroup);

    // 8. Astronaut Group & Materials
    const astronautGroup = new THREE.Group();
    astronautGroup.position.set(0, -0.45, 0.4);
    astronautGroup.rotation.y = -0.15;
    astronautGroup.scale.setScalar(1.05);
    scene.add(astronautGroup);

    const textureLoader = new THREE.TextureLoader();
    const loadTex = (url: string) => {
      const t = textureLoader.load(url);
      t.colorSpace = THREE.SRGBColorSpace;
      t.flipY = false;
      return t;
    };

    // Textures
    const helmetBase = loadTex("/models/lusion/astronaut_helmet_base.webp");
    const helmetNor = loadTex("/models/lusion/astronaut_helmet_nor.webp");
    const wearpackBase = loadTex("/models/lusion/astronaut_wearpack_base.webp");
    const wearpackNor = loadTex("/models/lusion/astronaut_wearpack_nor.webp");
    const gloveBase = loadTex("/models/lusion/astronaut_glove_shoes_base.webp");
    const gloveNor = loadTex("/models/lusion/astronaut_glove_shoes_nor.webp");

    const suitMat = (base: THREE.Texture, nor: THREE.Texture) =>
      new THREE.MeshStandardMaterial({
        map: base,
        normalMap: nor,
        roughness: 0.38,
        metalness: 0.12,
      });

    // Helmet Glass: High-Gloss Gold Mirror Chrome Visor
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xf59e0b,
      metalness: 0.95,
      roughness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 1.0,
    });

    const objLoader = new OBJLoader();

    // Load helmet
    objLoader.load("/models/lusion/astronaut_helmet.obj", (obj) => {
      obj.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          (child as THREE.Mesh).material = suitMat(helmetBase, helmetNor);
        }
      });
      astronautGroup.add(obj);
    });

    // Load helmet glass
    objLoader.load("/models/lusion/astronaut_helmet_glass.obj", (obj) => {
      obj.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          (child as THREE.Mesh).material = glassMat;
        }
      });
      astronautGroup.add(obj);
    });

    // Load posed wearpack
    objLoader.load(
      "/models/lusion/astronaut_wearpack_zero_g.obj",
      (obj) => {
        obj.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            (child as THREE.Mesh).material = suitMat(wearpackBase, wearpackNor);
          }
        });
        astronautGroup.add(obj);
      }
    );

    // Load posed gloves & shoes
    objLoader.load(
      "/models/lusion/astronaut_glove_shoes_zero_g.obj",
      (obj) => {
        obj.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            (child as THREE.Mesh).material = suitMat(gloveBase, gloveNor);
          }
        });
        astronautGroup.add(obj);
        setLoaded(true);
      }
    );

    // 9. Interactive Parallax & Cursor Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // 10. GSAP ScrollTrigger Sequence
    let scrollProgress = 0;
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "+=350%",
      pin: true,
      scrub: 0.6,
      onUpdate: (self) => {
        scrollProgress = self.progress;
      },
    });

    // 11. Animation Render Loop
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Zero-G idle floating motion
      const floatY = Math.sin(time * 1.4) * 0.06;
      const floatRotZ = Math.sin(time * 0.9) * 0.025;
      const floatRotX = Math.cos(time * 1.1) * 0.03;

      // Scroll progress transforms
      // 0.0 - 0.4: Floating in tunnel
      // 0.4 - 0.8: Tunnel plunge + color shift
      // 0.8 - 1.0: Deep space breakout
      const scrollZ = scrollProgress * 1.8;
      const scrollRotY = scrollProgress * Math.PI * 0.6;

      astronautGroup.position.y = -0.45 + floatY - mouseY * 0.15;
      astronautGroup.position.x = mouseX * 0.25;
      astronautGroup.position.z = 0.4 + scrollZ;

      astronautGroup.rotation.y = -0.15 + scrollRotY + mouseX * 0.35;
      astronautGroup.rotation.x = floatRotX + mouseY * 0.2;
      astronautGroup.rotation.z = floatRotZ;

      // Tunnel endless scrolling illusion
      tunnel.position.z = -10 + ((time * 3 + scrollProgress * 30) % 6);
      ringsGroup.position.z = (time * 3 + scrollProgress * 30) % 3;

      // Dynamic color shift based on scroll
      if (scrollProgress < 0.5) {
        // Cyan Cyber Tunnel
        const ratio = scrollProgress / 0.5;
        cyanRim.color.setHex(0x38bdf8);
        tunnelMat.color.setHex(0x0284c7);
        tunnelMat.opacity = 0.18 * (1 - ratio * 0.5);
      } else {
        // Magenta / Rose Deep Space Breakout
        const ratio = (scrollProgress - 0.5) / 0.5;
        cyanRim.color.lerp(new THREE.Color(0xf43f5e), ratio);
        tunnelMat.color.setHex(0xe11d48);
        tunnelMat.opacity = Math.max(0.04, 0.18 * (1 - ratio));
      }

      // Shards tumbling in zero-G
      shardsGroup.children.forEach((s, idx) => {
        s.rotation.x += 0.008 + (idx % 3) * 0.004;
        s.rotation.y += 0.012 + (idx % 2) * 0.005;
        s.position.z += 0.015 + scrollProgress * 0.08;
        if (s.position.z > 5) s.position.z = -8;
      });

      // Drifting star dust particles
      const pos = particleGeo.attributes.position.array as Float32Array;
      for (let i = 2; i < particleCount * 3; i += 3) {
        pos[i] += 0.04 + scrollProgress * 0.15;
        if (pos[i] > 5) pos[i] = -25;
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const onResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      trigger.kill();
      renderer.dispose();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="lusion-immersive"
      className="relative h-screen w-full overflow-hidden bg-[#020617] select-none"
    >
      {/* Native WebGL Canvas (Shows Directly, Zero Preloader, 60fps) */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full block" />

      {/* Cyber Grid HUD Overlays */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-6 md:p-12">
        {/* Top Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="font-mono text-[11px] font-semibold tracking-[0.24em] text-sky-400 uppercase drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]">
              ( 04 ) // SYSTEM OVERVIEW
            </span>
            <h2 className="font-sans text-[clamp(28px,4vw,56px)] font-black uppercase tracking-tight text-white leading-[0.95]">
              Built For{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-white">
                Zero Gravity
              </span>
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-4 py-1.5 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[11px] font-medium tracking-wider text-slate-300 uppercase">
              ORBITAL ENGINE ONLINE
            </span>
          </div>
        </div>

        {/* Bottom Status & Scroll Indicator */}
        <div className="flex items-end justify-between">
          <div className="max-w-[420px]">
            <p className="font-sans text-[13px] md:text-[15px] font-normal leading-relaxed text-slate-400">
              High-converting funnels engineered to defy acquisition limits. Every
              pixel, system, and flow is architected to perform in the wild.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
              SCROLL TO PILOT
            </span>
            <div className="h-9 w-5 rounded-full border border-sky-400/40 p-1 flex justify-center">
              <span className="h-2 w-1 rounded-full bg-sky-400 animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Technical Crosshairs */}
      <div className="pointer-events-none absolute left-6 top-6 text-white/20 font-mono text-xs select-none">
        +
      </div>
      <div className="pointer-events-none absolute right-6 top-6 text-white/20 font-mono text-xs select-none">
        +
      </div>
      <div className="pointer-events-none absolute left-6 bottom-6 text-white/20 font-mono text-xs select-none">
        +
      </div>
      <div className="pointer-events-none absolute right-6 bottom-6 text-white/20 font-mono text-xs select-none">
        +
      </div>
    </section>
  );
}
