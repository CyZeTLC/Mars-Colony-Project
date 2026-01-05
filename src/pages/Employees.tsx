import { useEffect, useRef } from 'react';
import TableRenderer from '../utils/TableRenderer.js';

const Employees = () => {
    const tableContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (tableContainerRef.current) {
            const csrf = localStorage.getItem('csrfToken') || 'dev';
            const myTable = new TableRenderer('table-app-id', 'https://hsbi.cyzetlc.de/dev/api/restApi.php?csrf=' + csrf + '&action=get_sql_result&file=getAllEmployees.sql');
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
                        <h3 className="text-xl font-bold text-white tracking-tight">Personalstamm</h3>
                        <p className="text-sm text-gray-400">Vollständige Datenbank aller aktiven Mitarbeiter</p>
                    </div>
                </div>

                <div className="hidden sm:block">
                    <span className="px-3 py-1 rounded-full border border-white/5 bg-white/5 text-[10px] uppercase tracking-widest text-gray-400 font-medium">
                        Sicherheitsfreigabe Level 4
                    </span>
                </div>
            </div>

            <div
                id="table-app-id"
                ref={tableContainerRef}
                className="transition-all duration-500 ease-in-out"
            >
                <div className="flex items-center gap-4 p-10 text-gray-500 bg-[#071422]/30 rounded-xl border border-white/5 shadow-inner">
                    <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-mars-accent animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 rounded-full bg-mars-accent animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 rounded-full bg-mars-accent animate-bounce"></div>
                    </div>
                    <span className="text-sm font-light tracking-widest uppercase">Synchronisiere Personalakten...</span>
                </div>
            </div>
        </section>
    );
};

export default Employees;