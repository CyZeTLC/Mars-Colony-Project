import React, { useState, useEffect } from 'react';
import { apiFetchFile } from "../utils/restApi";

async function loadAllSqlQueries() {
  try {
    const sqlQueries = await apiFetchFile('get_sql_files');
    return sqlQueries;
  } catch (e) {
    alert("Queries konnten nicht geladen werden!");
  }
}

const SqlOverview: React.FC = () => {
    // STATE-HOOKS definieren
    const [queries, setQueries] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // EFFECT-HOOK für den API-Aufruf
    useEffect(() => {
        // Asynchrone Funktion innerhalb des useEffect definieren und direkt ausführen
        const fetchQueries = async () => {
            try {
                const fetchedQueries = await loadAllSqlQueries();
                if (fetchedQueries) {
                    setQueries(fetchedQueries);
                } else {
                    setError("Daten konnten nicht abgerufen werden.");
                }
            } catch (e) {
                setError("Ein unerwarteter Fehler ist aufgetreten.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchQueries();
    }, []);

    if (isLoading) {
        return (
            <section>
                <p>🚀 Lade Queries...</p>
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
            <h3 className="text-2xl font-semibold text-mars-accent mb-4">Alle Queries</h3>
            <div className="bg-card-bg p-6 rounded-lg border border-gray-700">
                <p className="mb-4 font-bold">Liste der Queries:</p>
                <pre>
                    {queries}
                </pre>
                
            </div>
        </section>
    );
}

export default SqlOverview;