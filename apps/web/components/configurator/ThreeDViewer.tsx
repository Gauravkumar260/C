'use client';

import { Canvas } from '@react-three/fiber';
import { Stage, OrbitControls, Environment } from '@react-three/drei';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { Suspense } from 'react';

function PrimitiveCar() {
    const { exteriorColor, rims } = useConfiguratorStore();
    const color = exteriorColor?.hex || '#ffffff';

    return (
        <group>
            {/* Chassis */}
            <mesh position={[0, 0.5, 0]}>
                <capsuleGeometry args={[0.8, 2.5, 4, 16]} />
                <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} envMapIntensity={1} />
            </mesh>

            {/* Wheels */}
            <Wheel position={[-0.8, 0, 1]} />
            <Wheel position={[0.8, 0, 1]} />
            <Wheel position={[-0.8, 0, -1]} />
            <Wheel position={[0.8, 0, -1]} />
        </group>
    );
}

function Wheel({ position }: { position: [number, number, number] }) {
    const { rims } = useConfiguratorStore();

    return (
        <mesh position={position} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
            <meshStandardMaterial color={rims?.id === 'carbon-21' ? '#111' : '#ccc'} metalness={0.9} roughness={0.1} />
        </mesh>
    );
}

export default function ThreeDViewer() {
    return (
        <div className="h-full w-full relative">
            <Canvas shadows camera={{ position: [4, 2, 5], fov: 45 }}>
                <Suspense fallback={null}>
                    <Stage environment="city" intensity={0.5}>
                        <PrimitiveCar />
                    </Stage>
                    <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
                    <Environment preset="night" />
                </Suspense>
            </Canvas>
        </div>
    );
}
