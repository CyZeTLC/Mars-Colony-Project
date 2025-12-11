import React, { useState, useEffect } from 'react';
import { apiFetch } from "../utils/restApi";

interface Vehicle {
    id: number;
    name: string;
    status: string;
    available: boolean;
}

async function loadAllVehicles() {
  try {
    const vehicles = await apiFetch<Vehicle[]>('vehicles');
    return vehicles;
  } catch (e) {
    alert("Fahrzeuge konnten nicht geladen werden!");
  }
}

const Vehicles: React.FC = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const fetchedVehicles = await loadAllVehicles();
                if (fetchedVehicles) {
                    setVehicles(fetchedVehicles);
                } else {
                    setError("Daten konnten nicht abgerufen werden.");
                }
            } catch (e) {
                setError("Ein unerwarteter Fehler ist aufgetreten.");
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
        <section>
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h3 className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-orange-300 bg-clip-text text-transparent mb-2">
                        🛰️ Fahrzeugflotte
                    </h3>
                    <p className="text-orange-300/70">{vehicles.length} Einheiten</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vehicles.map((vehicle) => (
                        <div 
                            key={vehicle.id} 
                            className="group bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-gray-800/70 backdrop-blur-md ring-1 ring-slate-700/40 border border-transparent hover:border-orange-400/60 rounded-xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20 hover:-translate-y-1"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <h4 className="text-xl font-bold text-orange-300 group-hover:text-orange-200 transition-colors">
                                    {vehicle.name}
                                </h4>
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                    vehicle.available 
                                        ? 'bg-green-500/20 text-green-300 border border-green-500/40' 
                                        : 'bg-red-500/20 text-red-300 border border-red-500/40'
                                }`}>
                                    {vehicle.available ? '✓ Verfügbar' : '⚡ Eingesetzt'}
                                </span>
                            </div>
                            <p className="text-slate-300 text-sm">Status: <span className="text-orange-300 font-semibold">{vehicle.status}</span></p>
                        </div>
                    ))}
                </div>

                {vehicles.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-slate-400 text-lg">Keine Fahrzeuge verfügbar</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Vehicles;