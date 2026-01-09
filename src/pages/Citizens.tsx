import { useEffect, useRef } from 'react';
import TableRenderer from '../utils/TableRenderer.js';

const Citizens = () => {
    const tableContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (tableContainerRef.current) {
            const csrf = localStorage.getItem('csrfToken') || 'dev';
            const myTable = new TableRenderer('table-app-id-residents', 'https://hsbi.cyzetlc.de/dev/api/restApi.php?csrf=' + csrf + '&action=get_sql_result&file=getAllCitizens.sql');
            myTable.init();
        }
    }, []);

    return (
        <section className="relative">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-mars-accent/10 border border-mars-accent/20 text-mars-accent shadow-[0_0_15px_rgba(227,88,76,0.1)]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">Bewohner-Verzeichnis</h3>
                        <p className="text-sm text-gray-400">Übersicht aller registrierten Personen in den Städten</p>
                    </div>
                </div>

                <div className="hidden sm:block">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-mars-accent/5">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mars-accent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-mars-accent"></span>
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-300 font-semibold">
                            Live Population Sync
                        </span>
                    </div>
                </div>
            </div>

            <div
                id="table-app-id-residents"
                ref={tableContainerRef}
                className="transition-all duration-500 ease-in-out"
            >
                <div className="flex items-center gap-4 p-10 text-gray-500 bg-[#071422]/30 rounded-xl border border-white/5 shadow-inner">
                    <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-mars-accent/60 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-mars-accent/40 animate-pulse [animation-delay:0.2s]"></div>
                        <div className="w-2 h-2 rounded-full bg-mars-accent/20 animate-pulse [animation-delay:0.4s]"></div>
                    </div>
                    <span className="text-xs font-light tracking-[0.2em] uppercase">Abfrage der biometrischen Daten...</span>
                </div>
            </div>
        </section>
    );
};

export default Citizens;