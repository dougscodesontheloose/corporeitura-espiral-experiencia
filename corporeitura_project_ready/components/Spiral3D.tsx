import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float, Stars, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { ExperiencePoint } from '../types';

// Augment JSX namespace to allow Three.js intrinsic elements
// We include both global and module-scoped augmentations to cover different TS configurations.
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
      [elemName: string]: any;
    }
  }
}

// Support for setups where JSX is namespaced under React
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
      [elemName: string]: any;
    }
  }
}

interface Spiral3DProps {
  onPointClick: (point: ExperiencePoint) => void;
  zoomLevel: number; // 0 to 100
}

const Spiral3D: React.FC<Spiral3DProps> = ({ onPointClick, zoomLevel }) => {
  const pointsRef = useRef<THREE.Group>(null);
  const spiralRef = useRef<THREE.Mesh>(null);

  // Calculate camera distance based on zoom level
  // 0 (Far) -> distance 40
  // 100 (Near) -> distance 5
  const targetDistance = useMemo(() => {
    const minDistance = 5;
    const maxDistance = 40;
    // Linear interpolation: maxDistance -> minDistance
    return maxDistance - (zoomLevel / 100) * (maxDistance - minDistance);
  }, [zoomLevel]);

  // Generate spiral data based on the PDF's concept of "Tempo Espiralar"
  // Expanding outwards and upwards (accumulating experience)
  const { curve, experiencePoints } = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const expPoints: ExperiencePoint[] = [];
    const loops = 4.5;
    const height = 8;
    const radiusMax = 6;
    
    // Labels derived from the thesis concepts
    const labels = [
      { text: "Origem / Ancestralidade", desc: "A base de toda ação. O tempo curvo que retoma e transforma.", color: "#40e0d0" },
      { text: "Leitura", desc: "O contato inicial com a obra. A percepção ativa.", color: "#98d8e8" },
      { text: "Prática / O 'It'", desc: "A essência da origem. O movimento do impulso. A vivência corpórea.", color: "#7fffd4" },
      { text: "Figuração", desc: "O exercício dos sentidos. O 'atrás do pensamento'.", color: "#b19cd9" },
      { text: "Interconexão", desc: "Curadoria corpórea. Onde a dança e literatura dialogam.", color: "#ffd1dc" },
      { text: "Corporeitura", desc: "A leitura materializada no corpo. O auge da colaboração.", color: "#ffffff" },
      { text: "O Instante-Já", desc: "O presente indivisível. A consciência do ser no mundo.", color: "#40e0d0" }
    ];

    for (let i = 0; i <= 100; i++) {
      const t = i / 100;
      const angle = t * loops * Math.PI * 2;
      const r = (t * radiusMax) + 0.5; // Start with small radius, expand out
      const y = (t * height) - (height / 2); // Centered vertically
      
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      
      points.push(new THREE.Vector3(x, y, z));

      // Add interactive points at intervals
      if (i % 16 === 0 && i > 0 && i < 95) {
        const labelIndex = Math.min(Math.floor(i / 15), labels.length - 1);
        expPoints.push({
          id: i,
          x, y, z,
          label: labels[labelIndex].text,
          description: labels[labelIndex].desc,
          color: labels[labelIndex].color
        });
      }
    }
    
    const curve = new THREE.CatmullRomCurve3(points);
    return { curve, experiencePoints: expPoints };
  }, []);

  // Slow gentle rotation for the "floating in ocean" feel
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} color="#0a1628" />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#40e0d0" />
      <pointLight position={[-10, -10, -5]} intensity={0.8} color="#b19cd9" />
      <group ref={pointsRef}>
        {/* The Spiral Line (Tube) - "Bioluminescent" */}
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <mesh ref={spiralRef}>
            <tubeGeometry args={[curve, 128, 0.08, 8, false]} />
            <meshStandardMaterial 
              color="#7fffd4" 
              emissive="#40e0d0"
              emissiveIntensity={0.6}
              transparent 
              opacity={0.7}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        </Float>

        {/* Particles / Floating bits ("Estofo do mundo") */}
        <Stars radius={15} depth={10} count={1000} factor={3} saturation={0} fade speed={1} />

        {/* Experience Points (Interactive Nodes) */}
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
              {/* Halo Glow */}
              <mesh scale={[1.5, 1.5, 1.5]}>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshBasicMaterial color={point.color} transparent opacity={0.2} />
              </mesh>
            </Float>
            {/* Label floating above - Wrapped in Billboard to face camera */}
            <Billboard
              position={[0, 0.4, 0]}
              follow={true}
              lockX={false}
              lockY={false}
              lockZ={false}
            >
              <Text
                fontSize={0.25}
                color="white"
                anchorX="center"
                anchorY="middle"
                font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
              >
                {point.label}
              </Text>
            </Billboard>
          </group>
        ))}
      </group>

      {/* 
        Camera Controls 
        By setting minDistance and maxDistance to the same value (targetDistance),
        we lock the zoom to the slider value while still permitting rotation.
      */}
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