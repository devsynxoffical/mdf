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
const COL_SIGNAL = new THREE.Color("#3FE0B0");
const COL_BRASS = new THREE.Color("#E0A340");
const COL_BRASS_LO = new THREE.Color("#8A6224");
const COL_BONE = new THREE.Color("#F2EFE8");

/* ------------------------------------------------------------------ */
/* Lattice: 24 concentric ring tubes + 48 vertical ribs, merged into   */
/* a single mesh (one draw call).                                      */
/* ------------------------------------------------------------------ */
function useLatticeGeometry() {
  return useMemo(() => {
    const parts: THREE.BufferGeometry[] = [];

    const RINGS = 24;
    for (let i = 0; i < RINGS; i++) {
      // denser toward the top: bias ring placement upward
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
/* Particles                                                           */
/* ------------------------------------------------------------------ */
type ParticleSeeds = {
  angle0: Float32Array;
  radialFrac: Float32Array;
  speed: Float32Array;
  offset: Float32Array;
  survives: Uint8Array;
  dropY: Float32Array;
};

function makeSeeds(count: number): ParticleSeeds {
  const angle0 = new Float32Array(count);
  const radialFrac = new Float32Array(count);
  const speed = new Float32Array(count);
  const offset = new Float32Array(count);
  const survives = new Uint8Array(count);
  const dropY = new Float32Array(count);
  // deterministic-ish PRNG so SSR/CSR don't fight (canvas is client-only anyway)
  let s = 42;
  const rand = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
  for (let i = 0; i < count; i++) {
    angle0[i] = rand() * Math.PI * 2;
    radialFrac[i] = 0.15 + 0.85 * Math.sqrt(rand());
    speed[i] = 0.35 + rand() * 0.55;
    offset[i] = rand();
    survives[i] = rand() < 0.06 ? 1 : 0;
    dropY[i] = FUNNEL_TOP - (0.18 + rand() * 0.62) * (FUNNEL_TOP - FUNNEL_BOTTOM);
  }
  return { angle0, radialFrac, speed, offset, survives, dropY };
}

function Particles({ count }: { count: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const { progressRef } = useScrollState();
  const seeds = useMemo(() => makeSeeds(count), [count]);

  // Preallocated scratch objects — nothing allocated inside the frame loop.
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    // initialise instance colors once so the buffer exists
    for (let i = 0; i < count; i++) mesh.setColorAt(i, COL_MUTE);
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [count]);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = clock.getElapsedTime();
    const progress = progressRef.current;
    // flow accelerates slightly as the user descends the funnel
    const flow = 0.55 + progress * 0.65;

    const span = FUNNEL_TOP - MASS_Y + 1.2; // full survivor travel
    for (let i = 0; i < count; i++) {
      const cycle = span / seeds.speed[i];
      const phase = ((t * flow + seeds.offset[i] * cycle) % cycle) / cycle;
      let y = FUNNEL_TOP - phase * span;
      const surv = seeds.survives[i] === 1;

      let scale = 1;
      let rFrac = seeds.radialFrac[i];
      let radius: number;
      const angle =
        seeds.angle0[i] + t * 0.12 * seeds.speed[i] + (FUNNEL_TOP - y) * 0.22;

      if (!surv && y < seeds.dropY[i]) {
        // qualification failure: slip out through the lattice and fade away
        const out = Math.min(1, (seeds.dropY[i] - y) / 1.6);
        radius = funnelRadius(seeds.dropY[i]) * rFrac + out * 2.2;
        y = seeds.dropY[i] - out * out * 2.4;
        scale = Math.max(0, 1 - out * 1.25);
      } else if (y <= FUNNEL_BOTTOM) {
        // survivor below the spout: converge into the brass mass
        const sink = Math.min(1, (FUNNEL_BOTTOM - y) / (FUNNEL_BOTTOM - MASS_Y));
        radius = THREE.MathUtils.lerp(funnelRadius(FUNNEL_BOTTOM) * rFrac, 0.22, sink);
        scale = 1 + sink * 2; // scale up 3x as they convert
      } else {
        radius = funnelRadius(y) * rFrac;
      }

      dummy.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      const s = 1 * scale;
      dummy.scale.setScalar(s <= 0 ? 0.0001 : s);
      dummy.rotation.set(0, angle, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      // colour ramp by height: mute → signal (middle third) → brass (spout)
      const h = (y - FUNNEL_BOTTOM) / (FUNNEL_TOP - FUNNEL_BOTTOM); // 1 top → 0 bottom
      if (y <= FUNNEL_BOTTOM || (surv && h < 0.12)) {
        color.copy(COL_BRASS);
      } else if (h > 0.66) {
        color.copy(COL_MUTE).lerp(COL_SIGNAL, (1 - h) / 0.34);
      } else if (h > 0.33) {
        color.copy(COL_SIGNAL);
      } else {
        color.copy(COL_SIGNAL).lerp(COL_BRASS, 1 - h / 0.33);
      }
      mesh.setColorAt(i, color);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <icosahedronGeometry args={[0.012, 0]} />
      <meshStandardMaterial roughness={0.4} metalness={0.6} toneMapped={false} />
    </instancedMesh>
  );
}

/* ------------------------------------------------------------------ */
/* Stage marker rings                                                  */
/* ------------------------------------------------------------------ */
function StageRings() {
  const { activeStage, funnelEvents } = useScrollState();
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
    for (let i = 0; i < STAGE_RING_YS.length; i++) {
      const m = mats.current[i];
      if (!m) continue;
      let intensity = 0.15;
      if (i === activeStage) intensity = 0.45;
      const p0 = pulses.current[i];
      if (p0 >= 0) {
        const dt = t - p0;
        if (dt < 0.6) {
          // 0.15 → 0.8 → rest over 600ms
          const env = Math.sin((dt / 0.6) * Math.PI);
          intensity = Math.max(intensity, 0.15 + env * 0.65);
        }
      }
      m.emissiveIntensity = intensity;
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
            color={COL_BRASS}
            metalness={0.9}
            roughness={0.3}
            emissive={COL_BRASS}
            emissiveIntensity={0.15}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* The converted brass mass beneath the spout                          */
/* ------------------------------------------------------------------ */
function SpoutMass() {
  const ref = useRef<THREE.Mesh>(null!);
  const matRef = useRef<THREE.MeshStandardMaterial>(null!);
  const lightRef = useRef<THREE.PointLight>(null!);
  const { progressRef } = useScrollState();

  useFrame(({ clock }, delta) => {
    const p = progressRef.current;
    const t = clock.getElapsedTime();
    // grows as booked revenue accumulates through the scroll
    const grow = THREE.MathUtils.smoothstep(p, 0.25, 0.92);
    // the payoff moment: past ~0.9 the mass resolves and glows (bloom stand-in)
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
          color={COL_BRASS}
          metalness={0.95}
          roughness={0.25}
          emissive={COL_BRASS}
          emissiveIntensity={0.25}
          flatShading
        />
      </mesh>
      <pointLight ref={lightRef} color={COL_BRASS} intensity={0.6} distance={7} />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Lattice mesh with pulse support                                     */
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
      if (dt < 0.5) intensity += (1 - dt / 0.5) * 0.9; // brass spike, 500ms decay
    }
    matRef.current.emissiveIntensity = intensity;
  });

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        ref={matRef}
        color={COL_BRASS_LO}
        metalness={0.9}
        roughness={0.35}
        emissive={COL_BRASS_LO}
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/* Camera rig: travels down the funnel with scroll                     */
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
    // 0 → looking into the mouth from slightly above; 1 → at the spout
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
      <ambientLight intensity={0.25} />
      <directionalLight position={[-6, 10, 6]} color={COL_BONE} intensity={1.1} />
      <spotLight
        position={[0, -12, 3]}
        color={COL_BRASS}
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
