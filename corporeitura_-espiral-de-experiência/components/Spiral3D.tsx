
import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float, Stars, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { ExperiencePoint } from '../types';
import { SPIRAL_STAGES } from '../constants';

// Augment JSX namespace to allow Three.js intrinsic elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      pointLight: any;
      group: any;
      mesh: any;
      tubeGeometry: any;
      meshStandardMaterial: any;
      sphereGeometry: any;
      meshBasicMaterial: any;
      fogExp2: any;
      [elemName: string]: any;
    }
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      pointLight: any;
      group: any;
      mesh: any;
      tubeGeometry: any;
      meshStandardMaterial: any;
      sphereGeometry: any;
      meshBasicMaterial: any;
      fogExp2: any;
      [elemName: string]: any;
    }
  }
}

interface Spiral3DProps {
  onPointClick: (point: ExperiencePoint) => void;
  zoomLevel: number; // 0 to 100
  isDarkMode: boolean;
}

const Spiral3D: React.FC<Spiral3DProps> = ({ onPointClick, zoomLevel, isDarkMode }) => {
  const pointsRef = useRef<THREE.Group>(null);
  const spiralRef = useRef<THREE.Mesh>(null);

  // Calculate camera distance based on zoom level
  const targetDistance = useMemo(() => {
    const minDistance = 5;
    const maxDistance = 40;
    return maxDistance - (zoomLevel / 100) * (maxDistance - minDistance);
  }, [zoomLevel]);

  // Theme Colors
  const theme = useMemo(() => {
    return isDarkMode ? {
      fog: "#0a1628",
      spiralColor: "#7fffd4",
      spiralEmissive: "#40e0d0",
      particleColor: "#ffffff",
      textColor: "white",
      lights: { ambient: 0.4, point: 1.5 }
    } : {
      fog: "#e0f7fa", // Light blueish white
      spiralColor: "#5e3aee", // Deep purple/blue for contrast
      spiralEmissive: "#98d8e8",
      particleColor: "#0a1628", // Dark particles
      textColor: "#0a1628",
      lights: { ambient: 0.8, point: 1.0 }
    };
  }, [isDarkMode]);

  const { curve, experiencePoints } = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const expPoints: ExperiencePoint[] = [];
    const loops = 4.5;
    const height = 8;
    const radiusMax = 6;
    
    for (let i = 0; i <= 100; i++) {
      const t = i / 100;
      const angle = t * loops * Math.PI * 2;
      const r = (t * radiusMax) + 0.5;
      const y = (t * height) - (height / 2);
      
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      
      points.push(new THREE.Vector3(x, y, z));

      if (i % 16 === 0 && i > 0 && i < 95) {
        // Map index to SPIRAL_STAGES
        const labelIndex = Math.min(Math.floor(i / 15), SPIRAL_STAGES.length - 1);
        const stage = SPIRAL_STAGES[labelIndex];
        
        expPoints.push({
          id: i,
          x, y, z,
          label: stage.title,
          description: stage.desc,
          color: stage.color
        });
      }
    }
    
    const curve = new THREE.CatmullRomCurve3(points);
    return { curve, experiencePoints: expPoints };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <>
      {/* Fog creates the depth effect */}
      <fogExp2 attach="fog" args={[theme.fog, 0.02]} />

      <ambientLight intensity={theme.lights.ambient} color={isDarkMode ? "#0a1628" : "#ffffff"} />
      <pointLight position={[10, 10, 10]} intensity={theme.lights.point} color="#40e0d0" />
      <pointLight position={[-10, -10, -5]} intensity={theme.lights.point * 0.6} color="#b19cd9" />
      
      <group ref={pointsRef}>
        {/* The Spiral Line */}
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <mesh ref={spiralRef}>
            <tubeGeometry args={[curve, 128, 0.08, 8, false]} />
            <meshStandardMaterial 
              color={theme.spiralColor}
              emissive={theme.spiralEmissive}
              emissiveIntensity={isDarkMode ? 0.6 : 0.2}
              transparent 
              opacity={0.7}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        </Float>

        {/* Particles */}
        {isDarkMode ? (
           <Stars radius={15} depth={10} count={1000} factor={3} saturation={0} fade speed={1} />
        ) : (
           /* In light mode, we need custom dark particles as 'Stars' are white by default */
           <group>
             {Array.from({ length: 100 }).map((_, i) => (
               <mesh key={i} position={[
                 (Math.random() - 0.5) * 30,
                 (Math.random() - 0.5) * 30,
                 (Math.random() - 0.5) * 30
               ]}>
                 <sphereGeometry args={[0.03, 4, 4]} />
                 <meshBasicMaterial color="#0a1628" transparent opacity={0.3} />
               </mesh>
             ))}
           </group>
        )}

        {/* Experience Points */}
        {experiencePoints.map((point) => (
          <group key={point.id} position={[point.x, point.y, point.z]}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.2}>
              <mesh 
                onClick={(e) => { e.stopPropagation(); onPointClick(point); }}
                onPointerOver={() => document.body.style.cursor = 'pointer'}
                onPointerOut={() => document.body.style.cursor = 'default'}
              >
                <sphereGeometry args={[0.25, 32, 32]} />
                <meshStandardMaterial 
                  color={point.color}
                  emissive={point.color}
                  emissiveIntensity={0.8}
                  toneMapped={false}
                />
              </mesh>
              {/* Halo Glow - Adjust blend mode or opacity for light mode if needed */}
              <mesh scale={[1.5, 1.5, 1.5]}>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshBasicMaterial color={point.color} transparent opacity={0.2} />
              </mesh>
            </Float>
            
            <Billboard
              position={[0, 0.4, 0]}
              follow={true}
              lockX={false}
              lockY={false}
              lockZ={false}
            >
              <Text
                fontSize={0.25}
                color={theme.textColor} // Text color adapts to theme
                anchorX="center"
                anchorY="middle"
                font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
                outlineWidth={isDarkMode ? 0 : 0.02} // Outline in light mode for readability against spiral
                outlineColor="white"
              >
                {point.label}
              </Text>
            </Billboard>
          </group>
        ))}
      </group>

      <OrbitControls 
        makeDefault 
        enableZoom={true} 
        enablePan={true} 
        enableRotate={true}
        autoRotate={false}
        minPolarAngle={0}
        maxPolarAngle={Math.PI} 
        minDistance={targetDistance}
        maxDistance={targetDistance}
      />
    </>
  );
};

export default Spiral3D;
