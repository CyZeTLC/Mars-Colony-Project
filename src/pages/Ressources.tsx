import { useEffect, useRef } from 'react';
import TableRenderer from '../utils/TableRenderer.js';

const Ressources = () => {
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const lagerTableContainerRef = useRef<HTMLDivElement>(null);
    const csrf = localStorage.getItem('csrfToken') || 'dev';

    useEffect(() => {
        if (tableContainerRef.current) {
            const ressourceAtRiskTable = new TableRenderer('table-app-id', 'https://hsbi.cyzetlc.de/dev/api/restApi.php?csrf=' + csrf + '&action=get_sql_result&file=getRessourcesAtRisk.sql');
            ressourceAtRiskTable.init();
        }

        if (lagerTableContainerRef.current) {
            const lagerTable = new TableRenderer('table-app-id-lager', 'https://hsbi.cyzetlc.de/dev/api/restApi.php?csrf=' + csrf + '&action=get_sql_result&file=getAllLager.sql');
            lagerTable.init();
        }
    }, []);

    return (
        <section className="space-y-10 py-6">
            <div className="relative overflow-hidden">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">Kritische Ressourcen</h3>
                        <p className="text-sm text-gray-400">Ablaufdatum in weniger als <span className="text-red-400 font-semibold">30 Tagen</span></p>
                    </div>
                </div>

                <div
                    id="table-app-id"
                    ref={tableContainerRef}
                    className="transition-all duration-500 ease-in-out"
                >
                    <div className="flex items-center gap-3 p-8 text-gray-500 animate-pulse bg-[#071422]/30 rounded-xl border border-white/5">
                        <div className="w-4 h-4 rounded-full bg-mars-accent animate-ping"></div>
                        Initialisiere Datenbank-Stream...
                    </div>
                </div>
            </div>

            <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 rounded-lg bg-mars-accent/10 border border-mars-accent/20 text-mars-accent shadow-[0_0_15px_rgba(227,88,76,0.1)]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 8V21H3V8" /><path d="M1 3h22v5H1z" /><path d="M10 12h4" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">Bestandsübersicht</h3>
                        <p className="text-sm text-gray-400">Zentrales Logistik-Verzeichnis aller Lagerstandorte</p>
                    </div>
                </div>

                <div
                    id="table-app-id-lager"
                    ref={lagerTableContainerRef}
                    className="transition-all duration-500 ease-in-out"
                >
                    <div className="flex items-center gap-3 p-8 text-gray-500 animate-pulse bg-[#071422]/30 rounded-xl border border-white/5">
                        <div className="w-4 h-4 rounded-full bg-gray-600"></div>
                        Lade Lagerkapazitäten...
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Ressources;