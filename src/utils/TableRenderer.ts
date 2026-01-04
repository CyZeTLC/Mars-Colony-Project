interface TableRow {
    [key: string]: string | number | boolean | null;
}

interface ApiResponse {
    result: TableRow[];
}

class TableRenderer {
    private container: HTMLElement | null;

    constructor(private containerId: string, private apiUrl: string) {
        this.container = document.getElementById(containerId);
    }

    public async init(): Promise<void> {
        if (!this.container) {
            console.error(`Container mit ID "${this.containerId}" nicht gefunden.`);
            return;
        }

        try {
            this.container.innerHTML = '<p>Lade Daten...</p>';
            const data = await this.fetchData();

            if (data.length === 0) {
                this.container.innerHTML = '<p>Keine Daten vorhanden.</p>';
                return;
            }

            const tableHtml = this.generateTableHtml(data);
            this.container.innerHTML = tableHtml;
        } catch (error) {
            this.container.innerHTML = `<p style="color: red;">Fehler: ${error}</p>`;
        }
    }

    private async fetchData(): Promise<TableRow[]> {
        const response = await fetch(this.apiUrl);
        if (!response.ok) {
            throw new Error(`Server-Fehler: ${response.statusText}`);
        }
        const data: ApiResponse = await response.json();
        return data.result || [];
    }

    private generateTableHtml(data: TableRow[]): string {
        const headers = Object.keys(data[0]);

        let html = '<table class="w-full table-auto border-collapse border border-gray-400"><thead><tr>';

        headers.forEach(header => {
            html += `<th class="border border-gray-300 p-2 bg-gray-500">${this.escapeHtml(header)}</th>`;
        });
        html += '</tr></thead><tbody>';

        data.forEach(row => {
            html += '<tr>';
            headers.forEach(header => {
                const value = row[header] !== null ? row[header] : '';
                html += `<td class="border border-gray-300 p-2">${this.escapeHtml(String(value))}</td>`;
            });
            html += '</tr>';
        });

        html += '</tbody></table>';
        return html;
    }

    private escapeHtml(str: string): string {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
}
export default TableRenderer;