import { useEffect, useState } from 'react';
import { apiFetch } from '@/utils/restApi';

type Massnahme =
    | 'EXTERNEN_NACHSCHUB_ANFORDERN'
    | 'INTERNE_UMLAGERUNG_PRUEFEN'
    | 'BESTAND_SPERREN_UND_ERSATZ_BESCHAFFEN';

type Prioritaet = 'HOCH' | 'MITTEL' | 'NIEDRIG';

type Grund =
    | 'ABGELAUFEN_UND_UNTER_MINDESTBESTAND'
    | 'ABGELAUFENER_BESTAND_ERSETZEN'
    | 'UNTER_MINDESTBESTAND';

interface NachschubRow {
    NACHSCHUBANFORDERUNG_ID: string;
    RESSOURCE_ID: number;
    RESSOURCE_TYP: string;
    LAGER_ID: string | null;
    LAGERTYP: string | null;
    AKTUELLE_MENGE: number;
    MENGE_EINHEIT: string;
    MIN_SCHWELLENWERT: number | null;
    VERBRAUCH_PRO_SOL: number | null;
    SICHERHEITSPUFFER_7_SOL: number;
    ANFORDERUNGSMENGE: number;
    INTERN_VERFUEGBARE_MENGE: number;
    ANFORDERUNGSGRUND: Grund;
    ANFORDERUNGSPRIORITAET: Prioritaet;
    EMPFOHLENE_MASSNAHME: Massnahme;
}

interface ApiResponse {
    result: NachschubRow[];
}

type AktionTyp = 'NACHSCHUB_ANFORDERN' | 'UMLAGERUNG_PRUEFEN' | 'BESTAND_SPERREN';

interface AktionStatus {
    type: 'success' | 'error';
    message: string;
}

const MASSNAHME_CONFIG: Record<
    Massnahme,
    { label: string; icon: React.ReactNode; color: string; bg: string; border: string }
> = {
    EXTERNEN_NACHSCHUB_ANFORDERN: {
        label: 'Ext. Nachschub',
        icon: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
        ),
        color: 'text-orange-400',
        bg: 'bg-orange-500/10',
        border: 'border-orange-500/30',
    },
    INTERNE_UMLAGERUNG_PRUEFEN: {
        label: 'Interne Umlagerung',
        icon: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 16V4m0 0L3 8m4-4 4 4" /><path d="M17 8v12m0 0 4-4m-4 4-4-4" />
            </svg>
        ),
        color: 'text-sky-400',
        bg: 'bg-sky-500/10',
        border: 'border-sky-500/30',
    },
    BESTAND_SPERREN_UND_ERSATZ_BESCHAFFEN: {
        label: 'Bestand sperren',
        icon: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
        ),
        color: 'text-red-400',
        bg: 'bg-red-500/10',
        border: 'border-red-500/30',
    },
};

const PRIORITAET_CONFIG: Record<Prioritaet, { dot: string; text: string }> = {
    HOCH:    { dot: 'bg-red-500',    text: 'text-red-400' },
    MITTEL:  { dot: 'bg-yellow-400', text: 'text-yellow-400' },
    NIEDRIG: { dot: 'bg-green-500',  text: 'text-green-400' },
};

const GRUND_LABEL: Record<Grund, string> = {
    ABGELAUFEN_UND_UNTER_MINDESTBESTAND: 'Abgelaufen & unter Mindestbestand',
    ABGELAUFENER_BESTAND_ERSETZEN:       'Abgelaufener Bestand',
    UNTER_MINDESTBESTAND:                'Unter Mindestbestand',
};

const AKTION_LABEL: Record<AktionTyp, string> = {
    NACHSCHUB_ANFORDERN: 'Nachschub anfordern',
    UMLAGERUNG_PRUEFEN: 'Interne Umlagerung prüfen',
    BESTAND_SPERREN: 'Bestand sperren',
};

async function debugPerformAktion(aktion: AktionTyp, row: NachschubRow): Promise<AktionStatus> {
    console.debug(
        `[DEBUG] Aktion "${aktion}" für ${row.RESSOURCE_TYP} (${row.NACHSCHUBANFORDERUNG_ID}) ausgelöst.`,
        row,
    );

    await new Promise((resolve) => setTimeout(resolve, 700 + Math.random() * 700));

    const success = Math.random() > 0.2;

    if (success) {
        return {
            type: 'success',
            message: `${AKTION_LABEL[aktion]}: erfolgreich für ${row.RESSOURCE_TYP} (${row.NACHSCHUBANFORDERUNG_ID}) ausgelöst.`,
        };
    }

    return {
        type: 'error',
        message: `${AKTION_LABEL[aktion]} fehlgeschlagen für ${row.RESSOURCE_TYP}. Bitte erneut versuchen. (Debug-Fehler)`,
    };
}

function XIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
        </svg>
    );
}

function SpinnerIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="animate-spin">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.25" />
            <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
    );
}

function CheckCircleIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" />
        </svg>
    );
}

function AlertCircleIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" />
        </svg>
    );
}

function StatBar({ value, max, color }: { value: number; max: number; color: string }) {
    const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
    return (
        <div className="w-full h-1 rounded-full bg-white/5 overflow-hidden">
            <div
                className={`h-full rounded-full transition-all duration-700 ${color}`}
                style={{ width: `${pct}%` }}
            />
        </div>
    );
}

function NachschubCard({ row, onOpen }: { row: NachschubRow; onOpen: (row: NachschubRow) => void }) {
    const massnahme = MASSNAHME_CONFIG[row.EMPFOHLENE_MASSNAHME];
    const prio = PRIORITAET_CONFIG[row.ANFORDERUNGSPRIORITAET];
    const stockPct = row.MIN_SCHWELLENWERT
        ? Math.min((row.AKTUELLE_MENGE / row.MIN_SCHWELLENWERT) * 100, 100)
        : 0;

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={() => onOpen(row)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpen(row);
                }
            }}
            className={`relative flex flex-col gap-3 p-4 rounded-xl border bg-secondary transition-all duration-200 hover:border-white/15 hover:shadow-lg group focus:outline-none focus-visible:ring-2 focus-visible:ring-mars-accent/60 ${massnahme.border} hover:border-green-500/40 hover:cursor-pointer`}>

            
            <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-mono text-gray-500 truncate">{row.NACHSCHUBANFORDERUNG_ID}</p>
                    <h4 className="text-sm font-semibold text-white mt-0.5 truncate">{row.RESSOURCE_TYP}</h4>
                    {row.LAGER_ID && (
                        <p className="text-[11px] text-gray-500 mt-0.5">
                            {row.LAGERTYP ?? 'Lager'} · {row.LAGER_ID}
                        </p>
                    )}
                </div>

                
                <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`relative flex h-2 w-2`}>
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${prio.dot}`}></span>
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${prio.dot}`}></span>
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${prio.text}`}>
                        {row.ANFORDERUNGSPRIORITAET}
                    </span>
                </div>
            </div>

            
            <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-gray-400">
                    <span>Bestand</span>
                    <span className="font-mono">
                        {row.AKTUELLE_MENGE} / {row.MIN_SCHWELLENWERT ?? '—'} {row.MENGE_EINHEIT}
                    </span>
                </div>
                <StatBar
                    value={row.AKTUELLE_MENGE}
                    max={(row.MIN_SCHWELLENWERT ?? row.AKTUELLE_MENGE) || 1}
                    color={stockPct < 30 ? 'bg-red-500' : stockPct < 70 ? 'bg-yellow-400' : 'bg-green-500'}
                />
            </div>

            
            <div className="grid grid-cols-3 gap-2 text-center">
                {[
                    { label: 'Angefordert', value: row.ANFORDERUNGSMENGE, unit: row.MENGE_EINHEIT },
                    { label: 'Int. verfügbar', value: row.INTERN_VERFUEGBARE_MENGE, unit: row.MENGE_EINHEIT },
                    { label: 'Puffer 7 Sol', value: row.SICHERHEITSPUFFER_7_SOL, unit: row.MENGE_EINHEIT },
                ].map(({ label, value, unit }) => (
                    <div key={label} className="bg-primary/60 rounded-lg p-2">
                        <p className="text-[10px] text-gray-500 leading-tight">{label}</p>
                        <p className="text-sm font-bold text-white mt-0.5 font-mono">{value}</p>
                        <p className="text-[10px] text-gray-500">{unit}</p>
                    </div>
                ))}
            </div>

            
            <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/5">
                <span className="text-[11px] text-gray-500">{GRUND_LABEL[row.ANFORDERUNGSGRUND]}</span>
                <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-semibold ${massnahme.color} ${massnahme.bg}`}>
                    {massnahme.icon}
                    {massnahme.label}
                </div>
            </div>
        </div>
    );
}

function ResourceModal({ row, onClose }: { row: NachschubRow; onClose: () => void }) {
    const [visible, setVisible] = useState(false);
    const [pendingAktion, setPendingAktion] = useState<AktionTyp | null>(null);
    const [status, setStatus] = useState<AktionStatus | null>(null);

    const massnahme = MASSNAHME_CONFIG[row.EMPFOHLENE_MASSNAHME];
    const prio = PRIORITAET_CONFIG[row.ANFORDERUNGSPRIORITAET];

    useEffect(() => {
        const raf = requestAnimationFrame(() => setVisible(true));
        return () => cancelAnimationFrame(raf);
    }, []);

    useEffect(() => {
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = prevOverflow; };
    }, []);

    const handleClose = () => {
        setVisible(false);
        setTimeout(onClose, 180);
    };

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

    const runAktion = async (aktion: AktionTyp) => {
        if (pendingAktion) return;
        setPendingAktion(aktion);
        setStatus(null);
        const result = await debugPerformAktion(aktion, row);
        setPendingAktion(null);
        setStatus(result);
    };

    const aktionen: { type: AktionTyp; label: string; icon: React.ReactNode; color: string; bg: string; border: string }[] = [
        {
            type: 'NACHSCHUB_ANFORDERN',
            label: AKTION_LABEL.NACHSCHUB_ANFORDERN,
            icon: MASSNAHME_CONFIG.EXTERNEN_NACHSCHUB_ANFORDERN.icon,
            color: MASSNAHME_CONFIG.EXTERNEN_NACHSCHUB_ANFORDERN.color,
            bg: MASSNAHME_CONFIG.EXTERNEN_NACHSCHUB_ANFORDERN.bg,
            border: MASSNAHME_CONFIG.EXTERNEN_NACHSCHUB_ANFORDERN.border,
        },
        {
            type: 'UMLAGERUNG_PRUEFEN',
            label: AKTION_LABEL.UMLAGERUNG_PRUEFEN,
            icon: MASSNAHME_CONFIG.INTERNE_UMLAGERUNG_PRUEFEN.icon,
            color: MASSNAHME_CONFIG.INTERNE_UMLAGERUNG_PRUEFEN.color,
            bg: MASSNAHME_CONFIG.INTERNE_UMLAGERUNG_PRUEFEN.bg,
            border: MASSNAHME_CONFIG.INTERNE_UMLAGERUNG_PRUEFEN.border,
        },
        {
            type: 'BESTAND_SPERREN',
            label: AKTION_LABEL.BESTAND_SPERREN,
            icon: MASSNAHME_CONFIG.BESTAND_SPERREN_UND_ERSATZ_BESCHAFFEN.icon,
            color: MASSNAHME_CONFIG.BESTAND_SPERREN_UND_ERSATZ_BESCHAFFEN.color,
            bg: MASSNAHME_CONFIG.BESTAND_SPERREN_UND_ERSATZ_BESCHAFFEN.bg,
            border: MASSNAHME_CONFIG.BESTAND_SPERREN_UND_ERSATZ_BESCHAFFEN.border,
        },
    ];

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-200 ${visible ? 'opacity-100' : 'opacity-0'}`}
            onClick={handleClose}
            aria-modal="true"
            role="dialog"
        >
            
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            
            <div
                onClick={(e) => e.stopPropagation()}
                className={`relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-secondary border ${massnahme.border} rounded-2xl shadow-2xl p-6 transition-all duration-200 ease-out ${
                    visible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-3'
                }`}
            >
                
                <button
                    onClick={handleClose}
                    aria-label="Schließen"
                    className="absolute top-4 right-4 p-1.5 rounded-md text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
                >
                    <XIcon />
                </button>

                
                <p className="text-[10px] font-mono text-gray-500 pr-8">{row.NACHSCHUBANFORDERUNG_ID}</p>
                <h3 className="text-lg font-bold text-white mt-0.5 pr-8">{row.RESSOURCE_TYP}</h3>
                {row.LAGER_ID && (
                    <p className="text-xs text-gray-500 mt-0.5">
                        {row.LAGERTYP ?? 'Lager'} · {row.LAGER_ID}
                    </p>
                )}

                <div className="flex items-center gap-2 mt-3 flex-wrap">
                    <span className="relative flex h-2 w-2">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${prio.dot}`}></span>
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${prio.dot}`}></span>
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${prio.text}`}>
                        {row.ANFORDERUNGSPRIORITAET}
                    </span>
                    <span className="text-[11px] text-gray-500">· {GRUND_LABEL[row.ANFORDERUNGSGRUND]}</span>
                </div>

                
                <div className="space-y-1 mt-4">
                    <div className="flex justify-between text-[11px] text-gray-400">
                        <span>Bestand</span>
                        <span className="font-mono">
                            {row.AKTUELLE_MENGE} / {row.MIN_SCHWELLENWERT ?? '—'} {row.MENGE_EINHEIT}
                        </span>
                    </div>
                    <StatBar
                        value={row.AKTUELLE_MENGE}
                        max={(row.MIN_SCHWELLENWERT ?? row.AKTUELLE_MENGE) || 1}
                        color={row.MIN_SCHWELLENWERT && row.AKTUELLE_MENGE / row.MIN_SCHWELLENWERT < 0.3 ? 'bg-red-500' : 'bg-yellow-400'}
                    />
                </div>

                
                <div className="grid grid-cols-3 gap-2 text-center mt-4">
                    {[
                        { label: 'Angefordert', value: row.ANFORDERUNGSMENGE, unit: row.MENGE_EINHEIT },
                        { label: 'Int. verfügbar', value: row.INTERN_VERFUEGBARE_MENGE, unit: row.MENGE_EINHEIT },
                        { label: 'Puffer 7 Sol', value: row.SICHERHEITSPUFFER_7_SOL, unit: row.MENGE_EINHEIT },
                    ].map(({ label, value, unit }) => (
                        <div key={label} className="bg-primary/60 rounded-lg p-2">
                            <p className="text-[10px] text-gray-500 leading-tight">{label}</p>
                            <p className="text-sm font-bold text-white mt-0.5 font-mono">{value}</p>
                            <p className="text-[10px] text-gray-500">{unit}</p>
                        </div>
                    ))}
                </div>

                
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-semibold mt-4 ${massnahme.color} ${massnahme.bg}`}>
                    {massnahme.icon}
                    Empfohlen: {massnahme.label}
                </div>

                
                {status && (
                    <div
                        role="status"
                        className={`flex items-start gap-2 px-3 py-2.5 rounded-lg text-xs mt-4 border transition-opacity duration-200 ${
                            status.type === 'success'
                                ? 'bg-green-500/10 border-green-500/30 text-green-400'
                                : 'bg-red-500/10 border-red-500/30 text-red-400'
                        }`}
                    >
                        {status.type === 'success' ? <CheckCircleIcon /> : <AlertCircleIcon />}
                        <span className="leading-snug">{status.message}</span>
                    </div>
                )}

                
                <div className="flex flex-col gap-2 mt-5">
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Aktion durchführen</p>
                    {aktionen.map((a) => {
                        const isPending = pendingAktion === a.type;
                        const disabled = pendingAktion !== null;
                        return (
                            <button
                                key={a.type}
                                disabled={disabled}
                                onClick={() => runAktion(a.type)}
                                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold border transition-all duration-150 ${a.bg} ${a.border} ${a.color} ${
                                    disabled ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-125 hover:cursor-pointer'
                                }`}
                            >
                                {isPending ? <SpinnerIcon /> : a.icon}
                                {a.label}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

const ALL_MASSNAHMEN: Massnahme[] = [
    'EXTERNEN_NACHSCHUB_ANFORDERN',
    'INTERNE_UMLAGERUNG_PRUEFEN',
    'BESTAND_SPERREN_UND_ERSATZ_BESCHAFFEN',
];

const Restock = () => {
    const [data, setData] = useState<NachschubRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterMassnahme, setFilterMassnahme] = useState<Massnahme | 'ALL'>('ALL');
    const [filterPrio, setFilterPrio] = useState<Prioritaet | 'ALL'>('ALL');
    const [selectedRow, setSelectedRow] = useState<NachschubRow | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const res = await apiFetch<ApiResponse>(
                    'get_sql_result&file=getNachschubanforderungen.sql'
                );
                setData(res.result ?? []);
            } catch (e) {
                setError('Daten konnten nicht geladen werden.');
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const filtered = data.filter((row) => {
        const matchSearch = searchTerm.trim() === '' ||
            row.RESSOURCE_TYP.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.NACHSCHUBANFORDERUNG_ID.toLowerCase().includes(searchTerm.toLowerCase());
        const matchMassnahme = filterMassnahme === 'ALL' || row.EMPFOHLENE_MASSNAHME === filterMassnahme;
        const matchPrio = filterPrio === 'ALL' || row.ANFORDERUNGSPRIORITAET === filterPrio;
        return matchSearch && matchMassnahme && matchPrio;
    });

    const counts = {
        extern:    data.filter(r => r.EMPFOHLENE_MASSNAHME === 'EXTERNEN_NACHSCHUB_ANFORDERN').length,
        intern:    data.filter(r => r.EMPFOHLENE_MASSNAHME === 'INTERNE_UMLAGERUNG_PRUEFEN').length,
        sperren:   data.filter(r => r.EMPFOHLENE_MASSNAHME === 'BESTAND_SPERREN_UND_ERSATZ_BESCHAFFEN').length,
        hoch:      data.filter(r => r.ANFORDERUNGSPRIORITAET === 'HOCH').length,
    };

    return (
        <section className="relative">

            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-mars-accent/10 border border-mars-accent/20 text-mars-accent shadow-[0_0_15px_rgba(227,88,76,0.1)]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                            <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
                            <path d="M12 3v6" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">Nachschubanforderungen</h3>
                        <p className="text-sm text-gray-400">Ressourcen unter Schwellenwert oder mit abgelaufenem Bestand</p>
                    </div>
                </div>

                <div className="hidden sm:block">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-mars-accent/5">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mars-accent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-mars-accent"></span>
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-300 font-semibold">
                            Live Lager Sync
                        </span>
                    </div>
                </div>
            </div>

            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {[
                    { label: 'Ext. Nachschub', value: counts.extern,  color: 'text-orange-400', dot: 'bg-orange-500' },
                    { label: 'Int. Umlagerung', value: counts.intern,  color: 'text-sky-400',    dot: 'bg-sky-500' },
                    { label: 'Bestand sperren', value: counts.sperren, color: 'text-red-400',    dot: 'bg-red-500' },
                    { label: 'Hohe Priorität',  value: counts.hoch,   color: 'text-yellow-400', dot: 'bg-yellow-400' },
                ].map(({ label, value, color, dot }) => (
                    <div key={label} className="flex flex-col gap-1 p-3 rounded-xl bg-secondary border border-white/5">
                        <div className="flex items-center gap-1.5">
                            <span className={`inline-block w-2 h-2 rounded-full ${dot}`} />
                            <span className="text-[11px] text-gray-400">{label}</span>
                        </div>
                        <p className={`text-2xl font-bold font-mono ${color}`}>{value}</p>
                    </div>
                ))}
            </div>

            
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <input
                    type="text"
                    placeholder="Ressource oder ID suchen..."
                    className="flex-1 bg-primary p-3 outline-none rounded-md border-l-2 border-l-mars-accent text-sm placeholder:text-gray-600"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                
                <div className="flex gap-1.5 flex-wrap">
                    {(['ALL', ...ALL_MASSNAHMEN] as const).map((m) => {
                        const isAll = m === 'ALL';
                        const cfg = isAll ? null : MASSNAHME_CONFIG[m];
                        const active = filterMassnahme === m;
                        return (
                            <button
                                key={m}
                                onClick={() => setFilterMassnahme(m)}
                                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-[11px] font-semibold border transition-all duration-150 ${
                                    active
                                        ? isAll
                                            ? 'bg-mars-accent/20 border-mars-accent/50 text-mars-accent'
                                            : `${cfg!.bg} ${cfg!.border} ${cfg!.color}`
                                        : 'bg-primary border-white/5 text-gray-500 hover:border-white/15'
                                }`}
                            >
                                {!isAll && cfg!.icon}
                                {isAll ? 'Alle' : cfg!.label}
                            </button>
                        );
                    })}
                </div>

                
                <div className="flex gap-1.5">
                    {(['ALL', 'HOCH', 'MITTEL', 'NIEDRIG'] as const).map((p) => {
                        const active = filterPrio === p;
                        const cfg = p !== 'ALL' ? PRIORITAET_CONFIG[p] : null;
                        return (
                            <button
                                key={p}
                                onClick={() => setFilterPrio(p)}
                                className={`px-3 py-2 rounded-md text-[11px] font-bold border uppercase tracking-wider transition-all duration-150 ${
                                    active
                                        ? p === 'ALL'
                                            ? 'bg-mars-accent/20 border-mars-accent/50 text-mars-accent'
                                            : `${cfg!.text} bg-white/5 border-white/10`
                                        : 'bg-primary border-white/5 text-gray-500 hover:border-white/15'
                                }`}
                            >
                                {p === 'ALL' ? 'Alle' : p}
                            </button>
                        );
                    })}
                </div>
            </div>

            
            {loading && (
                <div className="flex items-center gap-4 p-10 text-gray-500 bg-secondary rounded-xl border border-white/5 shadow-inner">
                    <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-mars-accent/60 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-mars-accent/40 animate-pulse [animation-delay:0.2s]"></div>
                        <div className="w-2 h-2 rounded-full bg-mars-accent/20 animate-pulse [animation-delay:0.4s]"></div>
                    </div>
                    <span className="text-xs font-light tracking-[0.2em] uppercase">Lagerdaten werden abgerufen...</span>
                </div>
            )}

            {error && !loading && (
                <div className="flex items-center gap-3 p-6 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" />
                    </svg>
                    {error}
                </div>
            )}

            {!loading && !error && filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-3 p-16 bg-secondary rounded-xl border border-white/5 text-gray-500">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
                        <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" /><path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" /><path d="M12 3v6" />
                    </svg>
                    <p className="text-sm">Keine Anforderungen gefunden.</p>
                </div>
            )}

            {!loading && !error && filtered.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filtered.map((row) => (
                        <NachschubCard key={row.NACHSCHUBANFORDERUNG_ID} row={row} onOpen={setSelectedRow} />
                    ))}
                </div>
            )}

            
            {!loading && !error && data.length > 0 && (
                <p className="mt-4 text-right text-[11px] text-gray-600 font-mono">
                    {filtered.length} von {data.length} Anforderungen
                </p>
            )}

            
            {selectedRow && (
                <ResourceModal row={selectedRow} onClose={() => setSelectedRow(null)} />
            )}
        </section>
    );
};

export default Restock;
