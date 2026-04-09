import React, { useState, useEffect } from 'react';
import { apiFetch } from "../utils/restApi";
import ErrorBox from '../components/ui/ErrorBox';

interface ApiVehicle {
    TYP: string;
    NAME: string;
    STATUS: string;
    IMG: string;
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
    img: string;
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
                available: currentStatus.toLowerCase() === 'bereit',
                img: item.IMG || 'https://media.cnn.com/api/v1/images/stellar/prod/230614113409-curiosity-marker-band-valley.jpg?q=w_3000,c_fill'
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
    const [selectedVehicle, setSelectedVehicle] = useState<any | null>(null);
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const data = await loadAllVehicles();
                setVehicles(data);
            } catch (e) {
                setError("Die Flottenkapazitäten konnten nicht abgefragt werden.");
            } finally {
                sleep(750).then(() => setIsLoading(false));
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
        return <ErrorBox error={error} />;
    }

    return (
        <section>
            <div className="max-w-7xl">
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
                        <div><div
                            key={vehicle.id}
                            onClick={() => setSelectedVehicle(vehicle)}
                            className="group relative bg-secondary border border-slate-700/50 rounded-xl p-6 transition-all duration-300 hover:border-orange-400/60 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1 overflow-hidden"
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
                            {selectedVehicle && (
                                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                                    <div
                                        className="absolute inset-0 bg-main backdrop-blur-sm opacity-65"
                                        onClick={() => setSelectedVehicle(null)}
                                    />

                                    <div className="relative bg-secondary border border-slate-700/80 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl shadow-orange-950/20">

                                        <div className="relative h-28 w-full bg-slate-800">
                                            <img
                                                src={selectedVehicle.img}
                                                alt="Vehicle abstract pattern"
                                                className="w-full h-full object-cover opacity-80"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent" />

                                            <button
                                                onClick={() => setSelectedVehicle(null)}
                                                className="absolute top-4 right-4 p-2 bg-slate-900/50 hover:bg-slate-900 rounded-full text-slate-400 hover:text-white transition-colors"
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                                            </button>
                                        </div>

                                        <div className="px-7 pb-7">
                                            <div className="flex justify-between items-start mb-6">
                                                <div>
                                                    <span className="text-[10px] uppercase tracking-[0.2em] text-orange-500 font-mono">
                                                        {selectedVehicle.type}
                                                    </span>
                                                    <h2 className="text-2xl font-bold text-orange-300">
                                                        {selectedVehicle.name}
                                                    </h2>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${selectedVehicle.available
                                                    ? 'bg-green-500/10 text-green-400 border-green-500/30'
                                                    : 'bg-red-500/10 text-red-400 border-red-500/30'
                                                    }`}>
                                                    {selectedVehicle.available ? '✓ BEREIT' : '⚡ ' + selectedVehicle.status.toUpperCase()}
                                                </span>
                                            </div>

                                            <div className="space-y-1.5">
                                                <div className="h-[1px] w-full bg-slate-700/50 mb-3" />

                                                <p className="text-sm flex justify-between">
                                                    <span className="text-slate-400">Status:</span>
                                                    <span className="text-orange-200/80 font-medium">{selectedVehicle.status}</span>
                                                </p>
                                                <p className="text-sm flex justify-between">
                                                    <span className="text-slate-400">Typ:</span>
                                                    <span className="text-orange-200/80 font-medium">{selectedVehicle.type}</span>
                                                </p>
                                                <p className="text-sm flex justify-between">
                                                    <span className="text-slate-400">Einheit ID:</span>
                                                    <span className="text-orange-200/80 font-medium">#{selectedVehicle.id}</span>
                                                </p>
                                            </div>

                                            <button
                                                onClick={() => setSelectedVehicle(null)}
                                                className="uppercase mt-8 w-full py-3 bg-slate-800 hover:bg-orange-600/20 text-orange-300 text-sm font-bold rounded-xl transition-all border border-slate-700 hover:border-orange-500/50 active:scale-[0.98]"
                                            >
                                                zurück zur übersicht
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
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