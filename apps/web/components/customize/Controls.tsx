"use client";
import { useConfigStore } from "../../store/config";

export default function Controls() {
  const { vehicle, selectedOptions, setOption } = useConfigStore();

  if (!vehicle) return null;

  // Group options by type
  const optionsByType: Record<string, typeof vehicle.options> = {};
  vehicle.options.forEach(opt => {
    if (!optionsByType[opt.type]) optionsByType[opt.type] = [];
    optionsByType[opt.type].push(opt);
  });

  return (
    <div className="space-y-8">
      {Object.entries(optionsByType).map(([type, opts]) => (
        <div key={type}>
          <h3 className="text-lg font-bold font-rajdhani mb-3 capitalize text-white flex items-center gap-2">
            <span className="w-1 h-6 bg-cyan-500 rounded-full block"></span>
            {type.toLowerCase()}
          </h3>
          <div className="flex flex-wrap gap-3">
            {opts.map((opt) => {
              const isSelected = selectedOptions[type] === opt.id;
              let content = <span className="text-sm font-medium">{opt.name}</span>;

              if (type === "COLOR") {
                let hex = "#ffffff";
                try { hex = JSON.parse(opt.assets || '{}').hex; } catch {}

                content = (
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full border border-white/20 shadow-sm"
                      style={{ backgroundColor: hex }}
                    />
                    <span className="text-sm font-medium">{opt.name}</span>
                  </div>
                );
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => setOption(type, opt.id)}
                  className={`
                    px-4 py-3 rounded-lg border transition-all flex flex-col items-start gap-1 min-w-[120px]
                    ${isSelected
                      ? "border-cyan-500 bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(0,243,255,0.2)]"
                      : "border-slate-800 bg-slate-900/50 hover:border-slate-600 text-slate-300"}
                  `}
                >
                  {content}
                  {type !== "COLOR" && Number(opt.price) > 0 && (
                     <span className="text-xs text-slate-500 bg-slate-950 px-2 py-0.5 rounded">
                       +${Number(opt.price).toLocaleString()}
                     </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}