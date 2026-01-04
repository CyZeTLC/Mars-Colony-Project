import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { apiFetchFile } from "../utils/restApi";
import TableRenderer from '../utils/TableRenderer';

async function loadAllSqlQueries() {
    try {
        const sqlQueries = await apiFetchFile('get_sql_files');
        return sqlQueries;
    } catch (e) {
        console.error("Queries konnten nicht geladen werden!", e);
        return null;
    }
}

const SqlOverview: React.FC = () => {
    const [queries, setQueries] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [bewohnerQuery, setBewohnerQuery] = useState<string>("");
    const [koordsQuery, setKoordsQuery] = useState<string>("");

    useEffect(() => {
        const initializeDashboard = async () => {
            try {
                const fetchedQueries = await loadAllSqlQueries();
                if (fetchedQueries) {
                    setQueries((fetchedQueries as any).sql_content || fetchedQueries);
                }

                const csrf = localStorage.getItem('csrf_token') || 'dev';
                const response = await fetch(`https://hsbi.cyzetlc.de/dev/api/restApi.php?csrf=${csrf}&action=get_all_tables`);
                const data = await response.json();
                const tables = data.tables;

                setTimeout(() => {
                    if (tables.getAllEmployees) {
                        new TableRenderer('container-citizens', tables.getAllEmployees.result).init();
                        setBewohnerQuery(tables.getAllEmployees.sql);
                    }
                    if (tables.getKoords) {
                        new TableRenderer('container-coords', tables.getKoords.result).init();
                        setKoordsQuery(tables.getKoords.sql);
                    }
                }, 0);

            } catch (e) {
                setError("Fehler beim Initialisieren des Dashboards.");
            } finally {
                setIsLoading(false);
            }
        };

        initializeDashboard();
    }, []);

    if (isLoading) return <section><p>🚀 Lade Dashboard & Queries...</p></section>;
    if (error) return <section><p className="text-red-500">Fehler: {error}</p></section>;

    return (
        <div className="space-y-8">
            <section>
                <h3 className="text-2xl font-semibold text-mars-accent mb-4">Ergebnisse</h3>
                <div className="grid grid-cols-1 gap-6">
                    <div className="bg-card-bg p-4 rounded-lg border border-gray-700">
                        <h4 className="text-xl mb-2">Bürger Anzahl</h4>
                        <SyntaxHighlighter
                            language="sql"
                            style={dark}
                            showLineNumbers={true}
                            customStyle={{
                                backgroundColor: 'transparent',
                                padding: '0.5rem',
                                margin: '0',
                                marginBottom: '1rem',
                            }}
                        >
                            {bewohnerQuery}
                        </SyntaxHighlighter>
                        <div id="container-citizens"></div>
                    </div>
                    <div className="bg-card-bg p-4 rounded-lg border border-gray-700">
                        <h4 className="text-xl mb-2">Koordinaten</h4>
                        <SyntaxHighlighter
                            language="sql"
                            style={dark}
                            showLineNumbers={true}
                            customStyle={{
                                backgroundColor: 'transparent',
                                padding: '0.5rem',
                                margin: '0',
                                marginBottom: '1rem',
                            }}
                        >
                            {koordsQuery}
                        </SyntaxHighlighter>
                        <div id="container-coords"></div>
                    </div>
                </div>
            </section>

            <section>
                <h3 className="text-2xl font-semibold text-mars-accent mb-4">Alle Queries</h3>
                <div className="bg-card-bg p-6 rounded-lg border border-gray-700">
                    <p className="mb-4 font-bold">Liste der Queries:</p>
                    <SyntaxHighlighter
                        language="sql"
                        style={dark}
                        showLineNumbers={true}
                        customStyle={{
                            backgroundColor: 'transparent',
                            padding: '0',
                            margin: '0',
                        }}
                    >
                        {queries}
                    </SyntaxHighlighter>
                </div>
            </section>
        </div>
    );
};

export default SqlOverview;