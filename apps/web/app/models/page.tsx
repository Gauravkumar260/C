import ModelsClient from "@/components/models/ModelsClient";

async function getVehicles() {
  try {
    const res = await fetch("http://localhost:4000/vehicles", { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch vehicles:", error);
    return [];
  }
}

export default async function ModelsPage() {
  const vehicles = await getVehicles();
  return <ModelsClient vehicles={vehicles} />;
}
