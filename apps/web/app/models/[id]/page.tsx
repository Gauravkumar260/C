import { notFound } from "next/navigation";
import ModelDetailClient from "../../../components/models/ModelDetailClient";

async function getVehicle(id: string) {
  try {
    const res = await fetch(`http://localhost:4000/vehicles/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Failed to fetch vehicle:", error);
    return null;
  }
}

export default async function ModelDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vehicle = await getVehicle(id);

  if (!vehicle) {
    notFound();
  }

  return <ModelDetailClient vehicle={vehicle} />;
}
