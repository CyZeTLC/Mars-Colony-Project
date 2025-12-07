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
    // STATE-HOOKS definieren
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);    // Zustand für die Fahrzeugdaten
    const [isLoading, setIsLoading] = useState<boolean>(true);  // Zustand für den Ladezustand
    const [error, setError] = useState<string | null>(null);    // Zustand für Fehlermeldungen

    // EFFECT-HOOK für den API-Aufruf
    useEffect(() => {
        // Asynchrone Funktion innerhalb des useEffect definieren und direkt ausführen
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
            <section>
                <p>🚀 Lade Fahrzeugdaten...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section>
                <p className="text-red-500">Fehler: {error}</p>
            </section>
        );
    }
    
    return (
        <section>
            <h3 className="text-2xl font-semibold text-mars-accent mb-4">Fahrzeugflotte ({vehicles.length} Einheiten)</h3>
            <div className="bg-card-bg p-6 rounded-lg border border-gray-700">
                <p className="mb-4 font-bold">Liste der Rover:</p>
                <ul>
                    {vehicles.map((vehicle) => (
                        <li key={vehicle.id} className="p-2 border-b border-gray-600 flex justify-between">
                            <span><b>{vehicle.name}</b></span>
                            <span className={vehicle.available ? "text-green-400" : "text-red-400"}>
                                Status: {vehicle.status} ({vehicle.available ? 'Verfügbar' : 'Eingesetzt'})
                            </span>
                        </li>
                    ))}
                </ul>
                
            </div>
        </section>
    );
}

export default Vehicles;