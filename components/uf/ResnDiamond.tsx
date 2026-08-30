"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

interface ResnDiamondProps {
  className?: string;
  height?: string;
  showClickAndHoldPrompt?: boolean;
}

const VERTEX_SHADER = `
varying vec2 vUv;
varying vec3 vModelNormal;
varying vec3 vViewNormal;
varying vec3 vReflect;
varying vec3 vRefract;
varying vec3 vRefractG;
varying vec3 vRefractB;
varying vec3 vViewDirection;

uniform float ior;
uniform float colorAbberation;
uniform float externalReflectionBlend;

uniform float time;
uniform float weight;
uniform float periodPn;

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
  return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec3 fade(vec3 t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float pnoise(vec3 P, vec3 rep) {
  vec3 Pi0 = mod(floor(P), rep);
  vec3 Pi1 = mod(Pi0 + vec3(1.0), rep);
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec3 Pf0 = fract(P);
  vec3 Pf1 = Pf0 - vec3(1.0);
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 * (1.0 / 7.0);
  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 * (1.0 / 7.0);
  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
  return 2.2 * n_xyz;
}

float turbulence( vec3 p ) {
  float t = -.5;
  for (float f = 1.0 ; f <= 4.0 ; f++ ){
    float power = pow( 2.0, f );
    t += abs( pnoise( vec3( power * p ), vec3( 10.0, 10.0, 10.0 ) ) / power );
  }
  return t;
}

void main() {
  vUv = uv;
  vec4 mPosition = modelMatrix * vec4( position, 1.0 );
  vViewDirection = normalize(cameraPosition - mPosition.xyz);
  vModelNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );
  vViewNormal = normalize( mat3( modelViewMatrix[0].xyz, modelViewMatrix[1].xyz, modelViewMatrix[2].xyz ) * normal );

  vReflect = normalize( reflect( normalize( mPosition.xyz - cameraPosition ), vModelNormal ) );
  vRefract = normalize( refract( normalize( mPosition.xyz - cameraPosition ), vModelNormal, ior ) );
  vRefractG = normalize( refract( normalize( mPosition.xyz - cameraPosition ), vModelNormal, ior * (1.0 - colorAbberation) ) );
  vRefractB = normalize( refract( normalize( mPosition.xyz - cameraPosition ), vModelNormal, ior * (1.0 - colorAbberation * 2.0) ) );

  float noise = 20.0 * 0.90 * turbulence( 0.5 * normal + time );
  float displacement = - weight * noise;
  displacement += periodPn * pnoise( 0.06 * position + vec3( 2.0 * time ), vec3( 1.5 ) );

  vec3 newPosition = position + normal * vec3( displacement );
  gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}
`;

const FRAGMENT_SHADER = `
varying vec2 vUv;
varying vec3 vModelNormal;
varying vec3 vViewNormal;
varying vec3 vReflect;
varying vec3 vRefract;
varying vec3 vRefractG;
varying vec3 vRefractB;
varying vec3 vViewDirection;

uniform vec2 refractionTiling;
uniform float addReflection;
uniform float externalReflectionBlend;
uniform float refractionBlend;
uniform float frenselPower;
uniform float reflectionBrightness;
uniform float refractionBrightness;
uniform float refraction;
uniform float lightDiffuseBrightness;
uniform float lightSpecularPower;
uniform float lightSpecularBrightness;
uniform float globalOpacity;
uniform sampler2D relectionTexture;

void main() {
  vec2 reflectionCoord = vec2((vReflect.x * 0.25 + 0.5) * refractionTiling.x, (1.0 - vReflect.y * 0.25 + 0.5) * refractionTiling.y);
  reflectionCoord.xy = vec2(fract(reflectionCoord.x), fract(reflectionCoord.y));
  vec3 reflectionColor = texture2D( relectionTexture, reflectionCoord.xy ).rgb;
  reflectionColor *= reflectionBrightness;

  vec2 refractionCoord = vec2((vRefract.x * 0.25 + 0.5) * refractionTiling.x, (vRefract.y * 0.25 + 0.5) * refractionTiling.y);
  refractionCoord.xy = vec2(fract(refractionCoord.x), fract(refractionCoord.y));
  vec3 refractionColor = vec3(0.0);
  refractionColor.r = texture2D( relectionTexture, refractionCoord.xy ).r;

  refractionCoord = vec2((vRefractG.x * 0.25 + 0.5) * refractionTiling.x, (vRefractG.y * 0.25 + 0.5) * refractionTiling.y);
  refractionCoord.xy = vec2(fract(refractionCoord.x), fract(refractionCoord.y));
  refractionColor.g = texture2D( relectionTexture, refractionCoord.xy ).g;

  refractionCoord = vec2((vRefractB.x * 0.25 + 0.5) * refractionTiling.x, (vRefractB.y * 0.25 + 0.5) * refractionTiling.y);
  refractionCoord.xy = vec2(fract(refractionCoord.x), fract(refractionCoord.y));
  refractionColor.b = texture2D( relectionTexture, refractionCoord.xy ).b;

  refractionColor *= refractionBrightness;

  float fresnelAmount = 1.0 - dot(vViewNormal, vec3(0.0, 0.0, 1.0));
  fresnelAmount = pow(max(0.0, fresnelAmount), frenselPower);
  fresnelAmount = 1.0 - (1.0 - fresnelAmount) * refractionBlend;

  refractionColor = mix(vec3(0.0), refractionColor, refraction);

  vec3 blendedColor;
  if (addReflection == 1.0) {
    blendedColor = refractionColor + reflectionColor * fresnelAmount;
  } else {
    blendedColor = mix(refractionColor, reflectionColor, fresnelAmount);
  }

  vec3 lightDirection = normalize(vec3(1.0, 1.0, 1.0));
  float diffuseBrightness = max(0.0, dot(lightDirection, vModelNormal)) * lightDiffuseBrightness;
  float specularBrightness = 0.0;
  if (dot(vModelNormal, lightDirection) > 0.0) {
    specularBrightness = pow(max(0.0, dot(reflect(-lightDirection, vModelNormal), vViewDirection)), lightSpecularPower) * lightSpecularBrightness;
  }
  blendedColor.xyz += vec3(diffuseBrightness + specularBrightness);

  lightDirection = normalize(vec3(-1.0, 0.75, -0.75));
  diffuseBrightness = max(0.0, dot(lightDirection, vModelNormal)) * lightDiffuseBrightness;
  specularBrightness = 0.0;
  if (dot(vModelNormal, lightDirection) > 0.0) {
    specularBrightness = pow(max(0.0, dot(reflect(-lightDirection, vModelNormal), vViewDirection)), lightSpecularPower) * lightSpecularBrightness;
  }
  blendedColor.xyz += vec3(diffuseBrightness + specularBrightness);

  gl_FragColor = vec4(blendedColor, globalOpacity);
}
`;

export default function ResnDiamond({
  className = "",
  height = "h-[480px] sm:h-[580px] md:h-[680px]",
  showClickAndHoldPrompt = true,
}: ResnDiamondProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const isHoldingRef = useRef(false);
  const [isHolding, setIsHolding] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check if WebGL context can be created safely
    try {
      const testCanvas = document.createElement("canvas");
      const gl =
        testCanvas.getContext("webgl2") ||
        testCanvas.getContext("webgl") ||
        testCanvas.getContext("experimental-webgl");
      if (!gl) {
        setHasWebGL(false);
        setIsLoaded(true);
        return;
      }
    } catch {
      setHasWebGL(false);
      setIsLoaded(true);
      return;
    }

    let width = container.clientWidth || 600;
    let heightPx = container.clientHeight || 600;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let shaderMaterial: THREE.ShaderMaterial;
    let reflectionTex: THREE.Texture;

    try {
      // 1. Scene & Camera (matching Resn 30 FOV)
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(30, width / heightPx, 0.1, 1000);
      camera.position.set(0, 0, 200);

      // 2. Renderer
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, heightPx);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      container.appendChild(renderer.domElement);

      // 3. Texture Loader for Resn's Refraction Map
      const textureLoader = new THREE.TextureLoader();
      reflectionTex = textureLoader.load("/models/resn/refraction.jpg");
      reflectionTex.wrapS = THREE.RepeatWrapping;
      reflectionTex.wrapT = THREE.RepeatWrapping;

      // 4. Resn Refraction Shader Material
      const uniforms = {
        relectionTexture: { value: reflectionTex },
        refractionTiling: { value: new THREE.Vector2(4.0, 4.0) },
        addReflection: { value: 0.0 },
        externalReflectionBlend: { value: 0.86 },
        refractionBlend: { value: 0.86 },
        frenselPower: { value: 2.75 },
        reflectionBrightness: { value: 0.9 },
        refractionBrightness: { value: 0.9 },
        refraction: { value: 1.0 },
        lightDiffuseBrightness: { value: 0.1 },
        lightSpecularPower: { value: 80.0 },
        lightSpecularBrightness: { value: 0.8 },
        globalOpacity: { value: 1.0 },
        ior: { value: 0.7 },
        colorAbberation: { value: 0.0005 },
        time: { value: 0.0 },
        weight: { value: 0.0 },
        periodPn: { value: 0.0 },
      };

      shaderMaterial = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        transparent: true,
        side: THREE.DoubleSide,
      });

      // 5. Mesh Container
      const gemGroup = new THREE.Group();
      scene.add(gemGroup);

      // 6. Load Resn's Original 3D Model: drop_gem5.obj
      const objLoader = new OBJLoader();
      objLoader.load(
        "/models/resn/drop_gem5.obj",
        (object) => {
          object.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const gemMesh = child as THREE.Mesh;
              gemMesh.material = shaderMaterial;
              gemMesh.geometry.computeVertexNormals();
            }
          });
          // Scale and Y-offset from Resn's exact config
          gemGroup.scale.set(14, 14, 14);
          gemGroup.position.set(0, -8, 0);
          gemGroup.add(object);
          setIsLoaded(true);
        },
        undefined,
        (err) => {
          console.warn("Failed to load Resn drop_gem5.obj, using fallback:", err);
          setHasWebGL(false);
          setIsLoaded(true);
        }
      );

      // 7. Mouse & Interactive Physics Tracking
      let targetRotationX = 0;
      let targetRotationY = 0;
      let currentRotationX = 0;
      let currentRotationY = 0;
      let autoRotationAngle = 0;
      let currentWeight = 0;
      let targetWeight = 0;

      const handlePointerMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        targetRotationY = x * 0.75;
        targetRotationX = -y * 0.45;
        setMouseOffset({ x, y });
      };

      const handlePointerDown = () => {
        isHoldingRef.current = true;
        setIsHolding(true);
        targetWeight = 0.06;
      };

      const handlePointerUp = () => {
        isHoldingRef.current = false;
        setIsHolding(false);
        targetWeight = 0.0;
      };

      window.addEventListener("pointermove", handlePointerMove);
      container.addEventListener("pointerdown", handlePointerDown);
      window.addEventListener("pointerup", handlePointerUp);

      // 8. Resize Observer
      const handleResize = () => {
        if (!container) return;
        width = container.clientWidth;
        heightPx = container.clientHeight;
        camera.aspect = width / heightPx;
        camera.updateProjectionMatrix();
        renderer.setSize(width, heightPx);
      };
      window.addEventListener("resize", handleResize);

      // 9. Animation Loop
      let animationFrameId: number;
      let clock = new THREE.Clock();

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const delta = clock.getDelta();
        const elapsedTime = clock.getElapsedTime();

        uniforms.time.value = elapsedTime * 0.8;
        currentWeight += (targetWeight - currentWeight) * 0.08;
        uniforms.weight.value = currentWeight;

        autoRotationAngle += delta * (isHoldingRef.current ? 1.2 : 0.35);
        currentRotationX += (targetRotationX - currentRotationX) * 0.06;
        currentRotationY += (targetRotationY - currentRotationY) * 0.06;

        gemGroup.rotation.y = autoRotationAngle + currentRotationY;
        gemGroup.rotation.x = currentRotationX;
        gemGroup.rotation.z = Math.sin(elapsedTime * 0.5) * 0.05;

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("pointermove", handlePointerMove);
        container.removeEventListener("pointerdown", handlePointerDown);
        window.removeEventListener("pointerup", handlePointerUp);
        window.removeEventListener("resize", handleResize);
        try {
          renderer.dispose();
          shaderMaterial.dispose();
          reflectionTex.dispose();
        } catch {
          // ignore
        }
        if (container && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    } catch (e) {
      console.warn("WebGL initialization failed, using high-res fallback:", e);
      setHasWebGL(false);
      setIsLoaded(true);
    }
  }, []);

  return (
    <div className={`relative w-full select-none ${height} ${className}`}>
      {/* 3D Canvas Mount (Active when WebGL is available) */}
      {hasWebGL ? (
        <div
          ref={mountRef}
          className="h-full w-full cursor-grab active:cursor-grabbing"
        />
      ) : (
        /* High-Res Interactive Fallback */
        <div
          className="relative flex h-full w-full items-center justify-center cursor-grab active:cursor-grabbing"
          onMouseDown={() => setIsHolding(true)}
          onMouseUp={() => setIsHolding(false)}
          onMouseLeave={() => setIsHolding(false)}
          style={{
            transform: `perspective(1000px) rotateX(${mouseOffset.y * -8}deg) rotateY(${mouseOffset.x * 10}deg) scale(${
              isHolding ? 1.08 : 1.0
            })`,
            transition: isHolding
              ? "transform 0.15s cubic-bezier(0.1, 0.9, 0.2, 1)"
              : "transform 0.4s ease-out",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/models/resn/diamond_transparent.png"
            alt="Resn 3D Diamond Gem"
            className="max-h-[85%] max-w-[85%] object-contain select-none pointer-events-none drop-shadow-[0_20px_60px_rgba(18,84,236,0.3)] filter"
            draggable={false}
          />
        </div>
      )}

      {/* Resn-Authentic Minimal "CLICK & HOLD" Prompt */}
      {showClickAndHoldPrompt && (
        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-center transition-all duration-300">
          <span
            className={`font-mono text-[11px] uppercase tracking-[0.25em] transition-opacity duration-300 ${
              isHolding ? "text-cyan-400 font-bold opacity-100" : "text-white/40 opacity-70"
            }`}
          >
            {isHolding ? "RESONATING..." : "CLICK & HOLD"}
          </span>
        </div>
      )}
    </div>
  );
}
