import React, { useState, useEffect, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { apiFetchFile } from "../utils/restApi";
import TableRenderer from '../utils/TableRenderer';

interface ApiTable {
    result: any[];
    sql: string;
}

const SqlOverview: React.FC = () => {
    const [tableData, setTableData] = useState<Record<string, ApiTable>>({});
    const [allQueriesText, setAllQueriesText] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const renderedTables = useRef<Set<string>>(new Set());

    useEffect(() => {
        const initializeDashboard = async () => {
            try {
                const fetchedQueries = await apiFetchFile('get_sql_files');
                setAllQueriesText((fetchedQueries as any).sql_content || fetchedQueries);

                const csrf = localStorage.getItem('csrf_token') || 'dev';
                const response = await fetch(`https://hsbi.cyzetlc.de/dev/api/restApi.php?csrf=${csrf}&action=get_all_tables`);
                const data = await response.json();

                if (data && data.tables) {
                    setTableData(data.tables);
                }
            } catch (e) {
                setError("Fehler beim Laden der Daten.");
            } finally {
                setIsLoading(false);
            }
        };

        initializeDashboard();
    }, []);

    useEffect(() => {
        Object.keys(tableData).forEach((tableName) => {
            const containerId = `container-${tableName}`;
            const container = document.getElementById(containerId);

            if (container && !renderedTables.current.has(tableName)) {
                new TableRenderer(containerId, tableData[tableName].result).init();
                renderedTables.current.add(tableName);
            }
        });
    }, [tableData]);

    if (isLoading) {
        return (
            <section className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin text-4xl mb-4">🚀</div>
                    <p className="text-orange-300 text-lg">Lade Tabellen...</p>
                </div>
            </section>
        );
    }
    if (error) return <section><p className="text-red-500">Fehler: {error}</p></section>;

    return (
        <div className="space-y-8">
            <section>
                <h3 className="text-2xl font-semibold text-mars-accent mb-6">Datenbank Ergebnisse</h3>
                <div className="grid grid-cols-1 gap-10">
                    {Object.entries(tableData).map(([key, table]) => (
                        <div key={key} className="bg-card-bg p-6 rounded-lg border border-gray-700 shadow-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="text-xl font-bold text-white capitalize">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                </h4>
                                <span className="text-sm bg-gray-800 px-2 py-1 rounded text-gray-400">
                                    {table.result.length} Einträge
                                </span>
                            </div>

                            <details className="mb-4">
                                <summary className="cursor-pointer text-sm text-blue-400 hover:text-blue-300 mb-2">
                                    SQL Query anzeigen
                                </summary>
                                <SyntaxHighlighter
                                    language="sql"
                                    style={dark}
                                    customStyle={{
                                        backgroundColor: '#1a1a1a',
                                        padding: '1rem',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.85rem'
                                    }}
                                >
                                    {table.sql}
                                </SyntaxHighlighter>
                            </details>

                            <div id={`container-${key}`} className="overflow-x-auto min-h-[50px]">
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h3 className="text-2xl font-semibold text-mars-accent mb-4">Alle geladenen SQL-Dateien</h3>
                <div className="bg-card-bg p-6 rounded-lg border border-gray-700">
                    <SyntaxHighlighter language="sql" style={dark} showLineNumbers={true}>
                        {allQueriesText}
                    </SyntaxHighlighter>
                </div>
            </section>
        </div>
    );
};

export default SqlOverview;