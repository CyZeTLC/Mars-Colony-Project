import { useEffect, useRef } from 'react';
import TableRenderer from '../utils/TableRenderer.js';

const Employees = () => {
    const tableContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (tableContainerRef.current) {
            const myTable = new TableRenderer('table-app-id', 'https://cyzetlc.de/rest/data.php');
            myTable.init();
        }
    }, []);

    return (
        <section>
            <h3 className="text-2xl font-semibold text-mars-accent mb-4">
                Alle Mitarbeiter
            </h3>
            <div className="bg-card-bg p-6 rounded-lg border border-gray-700">
                <div id="table-app-id" ref={tableContainerRef}>
                    Lade Tabelle...
                </div>
            </div>
        </section>
    );
};

export default Employees;