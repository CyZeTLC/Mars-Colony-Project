interface TableRow {
    [key: string]: string | number | boolean | null;
}

interface ApiResponse {
    result: TableRow[];
}

class TableRenderer {
    private container: HTMLElement | null;

    constructor(
        private containerId: string,
        private apiUrlOrData: string | TableRow[]
    ) {
        this.container = document.getElementById(containerId);
    }

    public async init(): Promise<void> {
        if (!this.container) return;

        try {
            this.container.innerHTML = '<p>Lade...</p>';

            const data = typeof this.apiUrlOrData === 'string'
                ? await this.fetchData(this.apiUrlOrData)
                : this.apiUrlOrData;

            if (!data || data.length === 0) {
                this.container.innerHTML = '<p>Keine Daten vorhanden.</p>';
                return;
            }

            this.container.innerHTML = this.generateTableHtml(data);
        } catch (error) {
            this.container.innerHTML = `<p style="color: red;">Fehler: ${error}</p>`;
        }
    }

    private async fetchData(url: string): Promise<TableRow[]> {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Fehler beim Laden");
        const json = await response.json();
        return json.result || json;
    }

    private generateTableHtml(data: TableRow[]): string {
        if (!data || data.length === 0) {
            return '<div class="p-8 text-center text-gray-400 bg-[#071422]/60 backdrop-blur-md rounded-xl border border-white/5 italic font-light tracking-wide">Keine Datensätze in der Datenbank gefunden.</div>';
        }

        const headers = Object.keys(data[0]);

        let html = '<div class="overflow-hidden rounded-xl border border-white/5 bg-gradient-to-b from-[#071422]/60 to-[#03101a]/60 backdrop-blur-md shadow-2xl">';
        html += '<table class="w-full text-left text-sm border-separate border-spacing-0">';

        html += '<thead class="bg-white/5 text-mars-accent uppercase text-[10px] font-bold tracking-[0.15em]">';
        html += '<tr>';
        headers.forEach(header => {
            html += `<th class="px-6 py-4 border-b border-white/5">${this.escapeHtml(header)}</th>`;
        });
        html += '</tr></thead>';

        html += '<tbody class="divide-y divide-white/5">';
        data.forEach((row) => {
            html += '<tr class="group hover:bg-white/[0.03] transition-colors duration-200">';
            headers.forEach(header => {
                const value = row[header] !== null ? row[header] : '-';
                html += `<td class="px-6 py-4 text-gray-300 font-light tracking-wide group-hover:text-white transition-colors">${this.escapeHtml(String(value))}</td>`;
            });
            html += '</tr>';
        });

        html += '</tbody></table></div>';
        return html;
    }

    private escapeHtml(str: string): string {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
}
export default TableRenderer;