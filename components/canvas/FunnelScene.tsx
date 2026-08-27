"use client";

import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { useScrollState } from "@/components/providers/ScrollProvider";
import {
  FUNNEL_TOP,
  FUNNEL_BOTTOM,
  MASS_Y,
  funnelRadius,
  STAGE_RING_YS,
} from "./funnelMath";

const COL_MUTE = new THREE.Color("#7C879B");
const COL_VIOLET = new THREE.Color("#8E7BFF");
const COL_MINT = new THREE.Color("#3FE0B0");
const COL_LATTICE = new THREE.Color("#4A3F8C"); // dim violet wireframe
const COL_BONE = new THREE.Color("#F2EFE8");

// Where the orb / galaxy live: centered in the hero camera's view.
const ORB_CENTER = new THREE.Vector3(0, 5.0, 0);
// The galaxy disc is tilted toward the camera so the spiral reads.
const GAL_TILT = 1.15;

/** Morph weights for the three particle states, from page scroll progress. */
function morphWeights(p: number) {
  const s1 = THREE.MathUtils.smoothstep(p, 0.03, 0.07); // orb → galaxy
  const s2 = THREE.MathUtils.smoothstep(p, 0.1, 0.16); // galaxy → funnel flow
  return {
    orb: (1 - s1) * (1 - s2),
    gal: s1 * (1 - s2),
    flow: s2,
  };
}

/* ------------------------------------------------------------------ */
/* Lattice: 24 concentric ring tubes + 48 vertical ribs, merged into   */
/* a single mesh. Hidden during the orb/galaxy phases, fades in as the */
/* particles gather into the funnel.                                   */
/* ------------------------------------------------------------------ */
function useLatticeGeometry() {
  return useMemo(() => {
    const parts: THREE.BufferGeometry[] = [];

    const RINGS = 24;
    for (let i = 0; i < RINGS; i++) {
      const t = Math.pow(i / (RINGS - 1), 1.25);
      const y = FUNNEL_TOP - t * (FUNNEL_TOP - FUNNEL_BOTTOM);
      const r = funnelRadius(y);
      const g = new THREE.TorusGeometry(r, 0.006, 5, 72);
      g.rotateX(Math.PI / 2);
      g.translate(0, y, 0);
      parts.push(g);
    }

    const RIBS = 48;
    const SEGMENTS = 28;
    for (let i = 0; i < RIBS; i++) {
      const angle = (i / RIBS) * Math.PI * 2;
      const pts: THREE.Vector3[] = [];
      for (let s = 0; s <= SEGMENTS; s++) {
        const y = FUNNEL_TOP - (s / SEGMENTS) * (FUNNEL_TOP - FUNNEL_BOTTOM);
        const r = funnelRadius(y);
        pts.push(new THREE.Vector3(Math.cos(angle) * r, y, Math.sin(angle) * r));
      }
      const curve = new THREE.CatmullRomCurve3(pts);
      const g = new THREE.TubeGeometry(curve, SEGMENTS, 0.006, 4, false);
      parts.push(g);
    }

    const merged = mergeGeometries(parts, false)!;
    parts.forEach((p) => p.dispose());
    return merged;
  }, []);
}

/* ------------------------------------------------------------------ */
/* Particles: one instanced mesh, three states blended by scroll.      */
/* ------------------------------------------------------------------ */
type ParticleSeeds = {
  // flow (funnel journey)
  angle0: Float32Array;
  radialFrac: Float32Array;
  speed: Float32Array;
  offset: Float32Array;
  survives: Uint8Array;
  dropY: Float32Array;
  // orb (breathing cloud)
  orbDirX: Float32Array;
  orbDirY: Float32Array;
  orbDirZ: Float32Array;
  orbR: Float32Array;
  phase: Float32Array;
  // galaxy (spiral disc)
  galR: Float32Array;
  galA: Float32Array;
  galY: Float32Array;
  // colour personality in the orb/galaxy phases: 0 = mint … 1 = violet
  tint: Float32Array;
};

function makeSeeds(count: number): ParticleSeeds {
  const f = () => new Float32Array(count);
  const seeds: ParticleSeeds = {
    angle0: f(),
    radialFrac: f(),
    speed: f(),
    offset: f(),
    survives: new Uint8Array(count),
    dropY: f(),
    orbDirX: f(),
    orbDirY: f(),
    orbDirZ: f(),
    orbR: f(),
    phase: f(),
    galR: f(),
    galA: f(),
    galY: f(),
    tint: f(),
  };
  let s = 42;
  const rand = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
  for (let i = 0; i < count; i++) {
    // funnel flow
    seeds.angle0[i] = rand() * Math.PI * 2;
    seeds.radialFrac[i] = 0.15 + 0.85 * Math.sqrt(rand());
    seeds.speed[i] = 0.35 + rand() * 0.55;
    seeds.offset[i] = rand();
    seeds.survives[i] = rand() < 0.06 ? 1 : 0;
    seeds.dropY[i] = FUNNEL_TOP - (0.18 + rand() * 0.62) * (FUNNEL_TOP - FUNNEL_BOTTOM);

    // orb: random unit direction, shell-biased radius so it reads as a cloud
    const u = rand() * 2 - 1;
    const theta = rand() * Math.PI * 2;
    const sq = Math.sqrt(1 - u * u);
    seeds.orbDirX[i] = sq * Math.cos(theta);
    seeds.orbDirY[i] = u;
    seeds.orbDirZ[i] = sq * Math.sin(theta);
    seeds.orbR[i] = 0.9 + Math.pow(rand(), 0.55) * 1.5;
    seeds.phase[i] = rand() * Math.PI * 2;

    // galaxy: three spiral arms with scatter, thin in y
    const arm = i % 3;
    const tt = rand();
    const radius = 0.3 + 4.0 * Math.pow(tt, 0.72);
    seeds.galR[i] = radius;
    seeds.galA[i] =
      arm * ((Math.PI * 2) / 3) + radius * 1.25 + (rand() - 0.5) * 0.3;
    seeds.galY[i] = (rand() - 0.5) * 0.22 * (1.2 - radius / 4.3);

    seeds.tint[i] = rand();
  }
  return seeds;
}

function Particles({ count }: { count: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const { progressRef } = useScrollState();
  const seeds = useMemo(() => makeSeeds(count), [count]);

  // Pointer in NDC — the orb and galaxy answer the cursor.
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // Preallocated scratch — nothing allocated inside the frame loop.
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);
  const flowColor = useMemo(() => new THREE.Color(), []);
  const restColor = useMemo(() => new THREE.Color(), []);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    for (let i = 0; i < count; i++) mesh.setColorAt(i, COL_MUTE);
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [count]);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = clock.getElapsedTime();
    const progress = progressRef.current;
    const w = morphWeights(progress);
    const flow = 0.55 + progress * 0.65;
    const galSpin = t * 0.09;
    const wRest = w.orb + w.gal; // how "interactive" the system is right now

    // pointer mapped into the orb's world plane
    const px = pointer.current.x * 5.6;
    const py = ORB_CENTER.y + pointer.current.y * 3.2;
    const REPULSE_R = 1.5;

    const span = FUNNEL_TOP - MASS_Y + 1.2;
    for (let i = 0; i < count; i++) {
      /* ---- state C: funnel flow ---- */
      const cycle = span / seeds.speed[i];
      const phase = ((t * flow + seeds.offset[i] * cycle) % cycle) / cycle;
      let fy = FUNNEL_TOP - phase * span;
      const surv = seeds.survives[i] === 1;
      let flowScale = 1;
      let rFrac = seeds.radialFrac[i];
      let radius: number;
      const angle =
        seeds.angle0[i] + t * 0.12 * seeds.speed[i] + (FUNNEL_TOP - fy) * 0.22;

      if (!surv && fy < seeds.dropY[i]) {
        const out = Math.min(1, (seeds.dropY[i] - fy) / 1.6);
        radius = funnelRadius(seeds.dropY[i]) * rFrac + out * 2.2;
        fy = seeds.dropY[i] - out * out * 2.4;
        flowScale = Math.max(0, 1 - out * 1.25);
      } else if (fy <= FUNNEL_BOTTOM) {
        const sink = Math.min(1, (FUNNEL_BOTTOM - fy) / (FUNNEL_BOTTOM - MASS_Y));
        radius = THREE.MathUtils.lerp(funnelRadius(FUNNEL_BOTTOM) * rFrac, 0.22, sink);
        flowScale = 1 + sink * 2;
      } else {
        radius = funnelRadius(fy) * rFrac;
      }
      const fx = Math.cos(angle) * radius;
      const fz = Math.sin(angle) * radius;

      /* ---- state A: breathing orb ---- */
      const breathe = seeds.orbR[i] * (1 + 0.06 * Math.sin(t * 0.9 + seeds.phase[i]));
      let ox = ORB_CENTER.x + seeds.orbDirX[i] * breathe;
      let oy = ORB_CENTER.y + seeds.orbDirY[i] * breathe;
      const oz = ORB_CENTER.z + seeds.orbDirZ[i] * breathe;

      /* ---- state B: spiral galaxy, tilted to face the camera ---- */
      const ga = seeds.galA[i] + galSpin;
      const tz0 = Math.sin(ga) * seeds.galR[i];
      let gx = ORB_CENTER.x + Math.cos(ga) * seeds.galR[i];
      let gy = ORB_CENTER.y - Math.sin(GAL_TILT) * tz0 + seeds.galY[i] * Math.cos(GAL_TILT);
      const gz = ORB_CENTER.z + Math.cos(GAL_TILT) * tz0;

      /* pointer repulsion while the system is interactive */
      if (wRest > 0.01) {
        const dx1 = ox - px;
        const dy1 = oy - py;
        const d1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
        if (d1 < REPULSE_R && d1 > 0.0001) {
          const push = ((REPULSE_R - d1) / REPULSE_R) * 0.9;
          ox += (dx1 / d1) * push;
          oy += (dy1 / d1) * push;
        }
        const dx2 = gx - px;
        const dy2 = gy - py;
        const d2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        if (d2 < REPULSE_R && d2 > 0.0001) {
          const push = ((REPULSE_R - d2) / REPULSE_R) * 0.7;
          gx += (dx2 / d2) * push;
          gy += (dy2 / d2) * push;
        }
      }

      /* ---- blend ---- */
      const x = w.orb * ox + w.gal * gx + w.flow * fx;
      const y = w.orb * oy + w.gal * gy + w.flow * fy;
      const z = w.orb * oz + w.gal * gz + w.flow * fz;
      const scale = w.orb + w.gal + w.flow * flowScale;

      dummy.position.set(x, y, z);
      dummy.scale.setScalar(scale <= 0 ? 0.0001 : scale);
      dummy.rotation.set(0, angle, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      /* ---- colour ---- */
      // funnel ramp: mute at the mouth → violet mid (processing) → mint at
      // the spout (converted)
      const h = (fy - FUNNEL_BOTTOM) / (FUNNEL_TOP - FUNNEL_BOTTOM);
      if (fy <= FUNNEL_BOTTOM || (surv && h < 0.12)) {
        flowColor.copy(COL_MINT);
      } else if (h > 0.66) {
        flowColor.copy(COL_MUTE).lerp(COL_VIOLET, (1 - h) / 0.34);
      } else if (h > 0.33) {
        flowColor.copy(COL_VIOLET);
      } else {
        flowColor.copy(COL_VIOLET).lerp(COL_MINT, 1 - h / 0.33);
      }
      // orb/galaxy: a living blend of mint and violet per particle,
      // pushed past 1.0 so the unlit cloud glows (toneMapped is off)
      restColor.copy(COL_MINT).lerp(COL_VIOLET, seeds.tint[i]).multiplyScalar(1.6);
      color.copy(restColor).lerp(flowColor, w.flow);
      mesh.setColorAt(i, color);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <icosahedronGeometry args={[0.015, 0]} />
      <meshStandardMaterial roughness={0.4} metalness={0.6} toneMapped={false} />
    </instancedMesh>
  );
}

/* ------------------------------------------------------------------ */
/* Stage marker rings                                                  */
/* ------------------------------------------------------------------ */
function StageRings() {
  const { activeStage, funnelEvents, progressRef } = useScrollState();
  const mats = useRef<(THREE.MeshStandardMaterial | null)[]>([]);
  const pulses = useRef<number[]>(STAGE_RING_YS.map(() => -1));
  const clockRef = useRef(0);

  useEffect(() => {
    const prev = funnelEvents.current.pulseRing;
    funnelEvents.current.pulseRing = (i: number) => {
      pulses.current[i] = clockRef.current;
    };
    return () => {
      funnelEvents.current.pulseRing = prev;
    };
  }, [funnelEvents]);

  useEffect(() => {
    if (activeStage >= 0) pulses.current[activeStage] = clockRef.current;
  }, [activeStage]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    clockRef.current = t;
    const reveal = THREE.MathUtils.smoothstep(progressRef.current, 0.1, 0.18);
    for (let i = 0; i < STAGE_RING_YS.length; i++) {
      const m = mats.current[i];
      if (!m) continue;
      let intensity = 0.15;
      if (i === activeStage) intensity = 0.45;
      const p0 = pulses.current[i];
      if (p0 >= 0) {
        const dt = t - p0;
        if (dt < 0.6) {
          const env = Math.sin((dt / 0.6) * Math.PI);
          intensity = Math.max(intensity, 0.15 + env * 0.65);
        }
      }
      m.emissiveIntensity = intensity;
      m.opacity = reveal;
    }
  });

  return (
    <group>
      {STAGE_RING_YS.map((y, i) => (
        <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[funnelRadius(y) + 0.06, 0.018, 8, 96]} />
          <meshStandardMaterial
            ref={(el) => {
              mats.current[i] = el;
            }}
            color={COL_MINT}
            metalness={0.9}
            roughness={0.3}
            emissive={COL_MINT}
            emissiveIntensity={0.15}
            transparent
            opacity={0}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* The converted mass beneath the spout                                */
/* ------------------------------------------------------------------ */
function SpoutMass() {
  const ref = useRef<THREE.Mesh>(null!);
  const matRef = useRef<THREE.MeshStandardMaterial>(null!);
  const lightRef = useRef<THREE.PointLight>(null!);
  const { progressRef } = useScrollState();

  useFrame(({ clock }, delta) => {
    const p = progressRef.current;
    const t = clock.getElapsedTime();
    const grow = THREE.MathUtils.smoothstep(p, 0.25, 0.92);
    const resolve = THREE.MathUtils.smoothstep(p, 0.88, 0.97);
    const target = 0.15 + grow * 0.75 + resolve * 0.15;
    const s = THREE.MathUtils.damp(ref.current.scale.x, target, 4, delta);
    ref.current.scale.setScalar(Math.max(0.001, s));
    ref.current.rotation.y = t * 0.25;
    ref.current.rotation.x = Math.sin(t * 0.11) * 0.15;
    matRef.current.emissiveIntensity = 0.25 + resolve * 1.4;
    lightRef.current.intensity = 0.6 + resolve * 2.2;
  });

  return (
    <group position={[0, MASS_Y, 0]}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[0.85, 1]} />
        <meshStandardMaterial
          ref={matRef}
          color={COL_MINT}
          metalness={0.95}
          roughness={0.25}
          emissive={COL_MINT}
          emissiveIntensity={0.25}
          flatShading
        />
      </mesh>
      <pointLight ref={lightRef} color={COL_MINT} intensity={0.6} distance={7} />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Lattice mesh: fades in after the galaxy phase, pulse support        */
/* ------------------------------------------------------------------ */
function Lattice() {
  const geometry = useLatticeGeometry();
  const matRef = useRef<THREE.MeshStandardMaterial>(null!);
  const pulseAt = useRef(-1);
  const clockRef = useRef(0);
  const { progressRef, funnelEvents } = useScrollState();

  useEffect(() => {
    const prev = funnelEvents.current.pulseLattice;
    funnelEvents.current.pulseLattice = () => {
      pulseAt.current = clockRef.current;
    };
    return () => {
      funnelEvents.current.pulseLattice = prev;
    };
  }, [funnelEvents]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    clockRef.current = t;
    let intensity = 0.15 + progressRef.current * 0.2;
    if (pulseAt.current >= 0) {
      const dt = t - pulseAt.current;
      if (dt < 0.5) intensity += (1 - dt / 0.5) * 0.9;
    }
    matRef.current.emissiveIntensity = intensity;
    matRef.current.opacity = THREE.MathUtils.smoothstep(
      progressRef.current,
      0.1,
      0.18
    );
  });

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        ref={matRef}
        color={COL_LATTICE}
        metalness={0.9}
        roughness={0.35}
        emissive={COL_LATTICE}
        emissiveIntensity={0.15}
        transparent
        opacity={0}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/* Camera rig                                                          */
/* ------------------------------------------------------------------ */
function CameraRig() {
  const { camera } = useThree();
  const { progressRef } = useScrollState();
  const look = useMemo(() => new THREE.Vector3(), []);
  const smooth = useRef({ p: 0 });

  useFrame((_, delta) => {
    smooth.current.p = THREE.MathUtils.damp(
      smooth.current.p,
      progressRef.current,
      6,
      delta
    );
    const p = smooth.current.p;
    const camY = THREE.MathUtils.lerp(8.4, -7.2, p);
    const camZ = THREE.MathUtils.lerp(9, 4.6, Math.pow(p, 1.2));
    const lookY = THREE.MathUtils.lerp(5.2, MASS_Y, Math.pow(p, 0.9));
    camera.position.set(Math.sin(p * Math.PI * 0.5) * 0.6, camY, camZ);
    look.set(0, lookY, 0);
    camera.lookAt(look);
  });
  return null;
}

/* ------------------------------------------------------------------ */
export default function FunnelScene({ particleCount }: { particleCount: number }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[-6, 10, 6]} color={COL_BONE} intensity={1.0} />
      <spotLight
        position={[0, -12, 3]}
        color={COL_MINT}
        intensity={0.6}
        angle={0.8}
        penumbra={1}
      />
      <fog attach="fog" args={["#07090E", 10, 26]} />
      <CameraRig />
      <Lattice />
      <StageRings />
      <Particles count={particleCount} />
      <SpoutMass />
    </>
  );
}
