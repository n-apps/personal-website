import type { ComponentType } from 'react';
import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react';

const MissingTracksShaderGradient = ShaderGradient as ComponentType<
  Record<string, unknown>
>;

const missingTracksShaderProps = {
  animate: 'on',
  axesHelper: 'off',
  bgColor1: '#000000',
  bgColor2: '#000000',
  brightness: 0.5,
  cAzimuthAngle: 180,
  cDistance: 2.82,
  cPolarAngle: 80,
  cameraZoom: 9.1,
  color1: '#2f6f3d',
  color2: '#7fee64',
  color3: '#07100b',
  destination: 'onCanvas',
  embedMode: 'off',
  envPreset: 'city',
  format: 'gif',
  fov: 45,
  frameRate: 10,
  gizmoHelper: 'hide',
  grain: 'off',
  lightType: '3d',
  pixelDensity: 1,
  positionX: 0,
  positionY: 0,
  positionZ: 0,
  range: 'disabled',
  rangeEnd: 40,
  rangeStart: 0,
  reflection: 0.1,
  rotationX: 50,
  rotationY: 0,
  rotationZ: -60,
  shader: 'defaults',
  type: 'waterPlane',
  uAmplitude: 0,
  uDensity: 1.5,
  uFrequency: 0,
  uSpeed: 0.2,
  uStrength: 0.6,
  uTime: 8,
  wireframe: false,
};

export function MissingTracksShaderBackground() {
  return (
    <div className='absolute inset-0' aria-hidden='true'>
      <ShaderGradientCanvas
        className='mt-shader-canvas'
        fov={45}
        pixelDensity={1}
        pointerEvents='none'
        powerPreference='low-power'>
        <MissingTracksShaderGradient {...missingTracksShaderProps} />
      </ShaderGradientCanvas>
    </div>
  );
}
