"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Stage } from "@react-three/drei";
import { useConfigStore } from "../../store/config";

function Car() {
  const { getSelectedOption } = useConfigStore();
  const colorOpt = getSelectedOption("COLOR");
  const wheelOpt = getSelectedOption("WHEELS");

  let color = "#ffffff";
  try {
     color = colorOpt ? JSON.parse(colorOpt.assets || '{}').hex : "#ffffff";
  } catch {}

  const wheelType = wheelOpt ? wheelOpt.name : "Standard";

  return (
    <group dispose={null}>
      {/* Body: Represented as a Capsule (rotated 90 deg so it lays flat-ish like a car body) */}
      <mesh position={[0, 0.5, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <capsuleGeometry args={[0.5, 2, 4, 8]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Wheels */}
      <mesh position={[0.8, 0.3, 0.6]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
        <meshStandardMaterial color={wheelType.includes("Turbine") ? "#111" : "#555"} metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[-0.8, 0.3, 0.6]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
        <meshStandardMaterial color={wheelType.includes("Turbine") ? "#111" : "#555"} metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0.8, 0.3, -0.6]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
        <meshStandardMaterial color={wheelType.includes("Turbine") ? "#111" : "#555"} metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[-0.8, 0.3, -0.6]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
        <meshStandardMaterial color={wheelType.includes("Turbine") ? "#111" : "#555"} metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  );
}

export default function Visualizer() {
  return (
    <div className="w-full h-[500px] bg-slate-900 rounded-lg overflow-hidden border border-slate-800 relative">
      <Canvas shadows camera={{ position: [4, 2, 4], fov: 50 }}>
        <color attach="background" args={["#0f172a"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} castShadow />
        <Environment preset="city" />
        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} autoRotate autoRotateSpeed={0.5} />
        <Stage intensity={0.5} environment="city">
          <Car />
        </Stage>
      </Canvas>
      <div className="absolute bottom-4 left-4 bg-black/50 p-2 rounded text-xs text-white backdrop-blur-sm pointer-events-none">
        Interactive 3D Preview (Click & Drag)
      </div>
    </div>
  );
}