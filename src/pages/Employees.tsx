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
        <section>
            <h3 className="text-2xl font-semibold text-mars-accent mb-4">
                Alle Mitarbeiter
            </h3>
            <div id="table-app-id" ref={tableContainerRef}>
                Lade Tabelle...
            </div>
        </section>
    );
};

export default Employees;