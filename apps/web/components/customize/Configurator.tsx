"use client";
import { useEffect } from "react";
import { useConfigStore, Vehicle } from "../../store/config";
import Visualizer from "./Visualizer";
import Controls from "./Controls";
import Summary from "./Summary";

interface ConfiguratorProps {
  vehicle: Vehicle;
}

export default function Configurator({ vehicle }: ConfiguratorProps) {
  const { setVehicle } = useConfigStore();

  useEffect(() => {
    setVehicle(vehicle);
  }, [vehicle, setVehicle]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <Visualizer />
        <Controls />
      </div>
      <div className="lg:col-span-1">
        <Summary />
      </div>
    </div>
  );
}