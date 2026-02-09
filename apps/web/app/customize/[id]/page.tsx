import { notFound } from "next/navigation";
import RichConfigurator from "../../../components/customize/RichConfigurator";
import { Vehicle } from "../../../store/config";

async function getVehicle(id: string): Promise<Vehicle | null> {
  try {
    const res = await fetch(`http://localhost:4000/vehicles/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Failed to fetch vehicle:", error);
    return null;
  }
}

export default async function CustomizePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vehicle = await getVehicle(id);

  if (!vehicle) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen">
      <RichConfigurator vehicle={vehicle} />
    </div>
  );
}
