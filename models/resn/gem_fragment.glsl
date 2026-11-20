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

float PI = 3.14159265358979323846264;

float random(vec3 scale,float seed){return fract(sin(dot(gl_FragCoord.xyz+seed,scale))*43758.5453+seed);}

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

  float fresnelAmount;

  fresnelAmount = 1.0 - dot(vViewNormal, vec3(0.0, 0.0, 1.0));

  fresnelAmount = pow(fresnelAmount, frenselPower);
  fresnelAmount = 1.0 - (1.0 - fresnelAmount) * refractionBlend;

  refractionColor = mix(vec3(0.0), refractionColor, refraction);

  vec3 blendedColor;
  if (addReflection == 1.0) {
    blendedColor = refractionColor + reflectionColor * fresnelAmount;
  } else {
    blendedColor = mix(refractionColor, reflectionColor, fresnelAmount);
  }

  vec3 lightDirection;
  float diffuseBrightness, specularBrightness;

  lightDirection = normalize(vec3(1.0, 1.0, 1.0));
  diffuseBrightness = max(0.0, dot(lightDirection, vModelNormal)) * lightDiffuseBrightness;
  specularBrightness = 0.0;
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

  lightDirection = normalize(vec3(0.5, -0.5, -0.5));
  diffuseBrightness = max(0.0, dot(lightDirection, vModelNormal)) * lightDiffuseBrightness;
  specularBrightness = 0.0;
  if (dot(vModelNormal, lightDirection) > 0.0) {
    specularBrightness = pow(max(0.0, dot(reflect(-lightDirection, vModelNormal), vViewDirection)), lightSpecularPower) * lightSpecularBrightness ;//0.8; //50
  }
  blendedColor.xyz += vec3(diffuseBrightness + specularBrightness);

  gl_FragColor = vec4( blendedColor.xyz, globalOpacity);

}