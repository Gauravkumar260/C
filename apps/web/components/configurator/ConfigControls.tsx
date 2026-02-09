'use client';

import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import cars from '../../data/cars.json';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

export default function ConfigControls() {
    const { currentCarId, exteriorColor, rims, interior, setExteriorColor, setRims, setInterior } = useConfiguratorStore();
    const car = cars.find((c) => c.id === currentCarId);

    if (!car) return null;

    return (
        <div className="flex flex-col gap-8 p-6 bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-zinc-800">

            {/* Exterior Color */}
            <div className="space-y-3">
                <h3 className="text-sm font-mono uppercase text-zinc-400">Exterior Paint</h3>
                <div className="flex gap-3">
                    {car.colors.map((color) => (
                        <button
                            key={color.id}
                            onClick={() => setExteriorColor(color)}
                            className={cn(
                                "w-10 h-10 rounded-full border-2 transition-all hover:scale-110",
                                exteriorColor?.id === color.id ? "border-neon-blue scale-110 ring-2 ring-neon-blue/20" : "border-transparent"
                            )}
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                        />
                    ))}
                </div>
                <p className="text-white font-bold">{exteriorColor?.name}</p>
            </div>

            {/* Rims */}
            <div className="space-y-3">
                <h3 className="text-sm font-mono uppercase text-zinc-400">Wheels</h3>
                <div className="grid grid-cols-2 gap-3">
                    {car.rims.map((rim) => (
                        <button
                            key={rim.id}
                            onClick={() => setRims(rim)}
                            className={cn(
                                "p-3 rounded-xl border text-left transition-all hover:bg-zinc-800",
                                rims?.id === rim.id ? "border-neon-blue bg-zinc-800" : "border-zinc-700"
                            )}
                        >
                            <div className="text-white font-bold text-sm">{rim.name}</div>
                            <div className="text-xs text-zinc-400 mt-1">
                                {rim.price > 0 ? `+ $${rim.price.toLocaleString()}` : 'Included'}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Interior */}
            <div className="space-y-3">
                <h3 className="text-sm font-mono uppercase text-zinc-400">Interior</h3>
                <div className="grid grid-cols-2 gap-3">
                    {car.interiors.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => setInterior(option)}
                            className={cn(
                                "p-3 rounded-xl border text-left transition-all hover:bg-zinc-800",
                                interior?.id === option.id ? "border-neon-blue bg-zinc-800" : "border-zinc-700"
                            )}
                        >
                            <div className="text-white font-bold text-sm">{option.name}</div>
                            <div className="text-xs text-zinc-400 mt-1">{option.material}</div>
                        </button>
                    ))}
                </div>
            </div>

        </div>
    );
}
