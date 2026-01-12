import React, { useState, useEffect } from 'react';
import { apiFetch } from "../utils/restApi";

interface ApiVehicle {
    TYP: string;
    NAME: string;
    STATUS: string;
}

interface ApiResponse {
    result: ApiVehicle[];
}

interface Vehicle {
    id: number | string;
    name: string;
    status: string;
    type: string;
    available: boolean;
}

async function loadAllVehicles(): Promise<Vehicle[]> {
    try {
        const endpoint = 'get_sql_result&file=getFlotte.sql';
        const response = await apiFetch<ApiResponse>(endpoint);

        if (!response || !response.result) {
            return [];
        }

        return response.result.map((item, index) => {
            const currentStatus = item.STATUS || "Unbekannt";

            return {
                id: index,
                name: item.NAME || "Unbenanntes Fahrzeug",
                status: currentStatus,
                type: item.TYP || "Allgemein",
                available: currentStatus.toLowerCase() === 'bereit'
            };
        });
    } catch (e) {
        console.error("Fahrzeuge konnten nicht geladen werden", e);
        throw e;
    }
}

const Vehicles: React.FC = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const data = await loadAllVehicles();
                setVehicles(data);
            } catch (e) {
                setError("Die Flottenkapazitäten konnten nicht abgefragt werden.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchVehicles();
    }, []);

    if (isLoading) {
        return (
            <section className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin text-4xl mb-4">🚀</div>
                    <p className="text-orange-300 text-lg">Lade Fahrzeugdaten...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="min-h-screen flex items-center justify-center p-4">
                <div className="bg-red-900/30 border border-red-500 rounded-xl p-6 max-w-md backdrop-blur-sm">
                    <p className="text-red-400 text-center">⚠️ Fehler: {error}</p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center gap-4 mb-10">
                    <div className="p-2.5 rounded-lg bg-mars-accent/10 border border-mars-accent/20 text-mars-accent shadow-[0_0_15px_rgba(227,88,76,0.1)]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">Fahrzeugflotte</h3>
                        <p className="text-sm text-gray-400">Statusübersicht aller {vehicles.length} Einheiten im Sektor</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vehicles.map((vehicle) => (
                        <div
                            key={vehicle.id}
                            className="group relative bg-slate-900/90 border border-slate-700/50 rounded-xl p-6 transition-all duration-300 hover:border-orange-400/60 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-orange-500/80 font-mono">
                                            {vehicle.type}
                                        </span>
                                        <h4 className="text-xl font-bold text-orange-300 group-hover:text-white transition-colors">
                                            {vehicle.name}
                                        </h4>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${vehicle.available
                                        ? 'bg-green-500/10 text-green-400 border-green-500/30'
                                        : 'bg-red-500/10 text-red-400 border-red-500/30'
                                        }`}>
                                        {vehicle.available ? '✓ BEREIT' : '⚡ ' + vehicle.status.toUpperCase()}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    <div className="h-[1px] w-full bg-slate-700/50" />
                                    <p className="text-slate-400 text-sm flex justify-between">
                                        <span>Status:</span>
                                        <span className="text-orange-200/80 font-medium">{vehicle.status}</span>
                                    </p>
                                    <p className="text-slate-400 text-sm flex justify-between">
                                        <span>Typ:</span>
                                        <span className="text-orange-200/80 font-medium">{vehicle.type}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {vehicles.length === 0 && (
                    <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-dashed border-slate-700">
                        <p className="text-slate-500 text-lg italic">Keine Fahrzeuge in der Datenbank gefunden.</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Vehicles;