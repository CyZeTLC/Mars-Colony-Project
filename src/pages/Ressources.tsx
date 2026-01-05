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
        <section>
            <h3 className="text-2xl font-semibold text-mars-accent mb-4">
                Ressourcen, die in weniger als 30 Tagen ablaufen
            </h3>
            <div className="bg-card-bg p-6 rounded-lg border border-gray-700">
                <div id="table-app-id" ref={tableContainerRef}>
                    Lade Tabelle...
                </div>
            </div>

            <h3 className="mt-6 text-2xl font-semibold text-mars-accent mb-4">
                Alle Lager
            </h3>
            <div className="bg-card-bg p-6 rounded-lg border border-gray-700">
                <div id="table-app-id-lager" ref={lagerTableContainerRef}>
                    Lade Tabelle...
                </div>
            </div>
        </section>
    );
};

export default Ressources;