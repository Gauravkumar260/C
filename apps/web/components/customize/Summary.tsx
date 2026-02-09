"use client";
import { useState } from "react";
import { useConfigStore } from "../../store/config";
import { useRouter } from "next/navigation";

export default function Summary() {
  const { getTotalPrice, vehicle, selectedOptions } = useConfigStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const totalPrice = getTotalPrice();

  const saveCustomization = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      throw new Error("Login required");
    }

    const res = await fetch("/api/customizations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        vehicleId: vehicle?.id,
        config: JSON.stringify(selectedOptions),
        totalPrice: totalPrice,
        preview: "http://placeholder.url/preview.png"
      })
    });

    if (!res.ok) {
       if (res.status === 401) { router.push("/login"); throw new Error("Login required"); }
       throw new Error("Failed to save customization");
    }

    return res.json();
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");
    try {
      await saveCustomization();
      alert("Configuration Saved!");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
     const token = localStorage.getItem("token");
     if (!token) {
        router.push("/login");
        return;
     }

     setLoading(true);
     setError("");

     try {
       // 1. Save customization first
       const customization = await saveCustomization();

       // 2. Create Order
       const res = await fetch("/api/orders", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
           "Authorization": `Bearer ${token}`
         },
         body: JSON.stringify({
           customizationId: customization.id
         })
       });

       if (!res.ok) throw new Error("Failed to create order");

       router.push("/checkout/success");
     } catch (err) {
       if (err instanceof Error) {
         setError(err.message);
       } else {
         setError("An unknown error occurred");
       }
     } finally {
       setLoading(false);
     }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg sticky top-24">
      <h2 className="text-2xl font-bold font-rajdhani mb-6 border-b border-slate-800 pb-4">Summary</h2>

      <div className="flex justify-between items-center mb-2">
        <span className="text-slate-400">Base Price</span>
        <span className="font-medium">${Number(vehicle?.basePrice || 0).toLocaleString()}</span>
      </div>

      <div className="flex justify-between items-center mb-6">
        <span className="text-slate-400">Options Total</span>
        <span className="font-medium text-cyan-400">
          +${(totalPrice - Number(vehicle?.basePrice || 0)).toLocaleString()}
        </span>
      </div>

      <div className="flex justify-between items-center mb-8 pt-4 border-t border-slate-800">
        <span className="text-xl font-bold text-white">Total</span>
        <span className="text-3xl font-bold text-cyan-400">${totalPrice.toLocaleString()}</span>
      </div>

      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

      <div className="space-y-3">
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded transition-colors border border-slate-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Configuration"}
        </button>
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded transition-colors disabled:opacity-50"
        >
          Checkout Now
        </button>
      </div>
    </div>
  );
}