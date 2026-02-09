'use client';

import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import Link from 'next/link';

export default function PriceSummary() {
    const { totalPrice } = useConfiguratorStore();

    return (
        <div className="fixed bottom-0 left-0 w-full bg-black/80 backdrop-blur-lg border-t border-zinc-800 p-6 z-50 md:relative md:bg-transparent md:border-none md:p-0">
            <div className="flex justify-between items-center md:flex-col md:items-start md:gap-4 md:p-6 md:bg-zinc-900/50 md:rounded-2xl md:border md:border-zinc-800">
                <div>
                    <p className="text-zinc-400 text-sm font-mono uppercase">Total Price</p>
                    <div className="text-3xl font-bold font-mono text-white">
                        ${totalPrice.toLocaleString()}
                    </div>
                </div>

                <Link
                    href="/test-drive"
                    className="bg-neon-blue text-black font-bold py-3 px-8 rounded-full hover:bg-cyan-300 transition-colors shadow-[0_0_20px_rgba(0,243,255,0.3)]"
                >
                    Book Test Drive
                </Link>
            </div>
        </div>
    );
}
