import { useEffect, useRef, useState } from 'react';
import TableRenderer from '@/utils/TableRenderer.js';

const Sales = () => {
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const [currentStep, setCurrentStep] = useState<'ueberschuss' | 'potenzial' | 'abgabe'>('ueberschuss');

    useEffect(() => {
        if (tableContainerRef.current) {
            let sqlFile = 'getRessourcenUeberschuss.sql';
            if (currentStep === 'potenzial') sqlFile = 'getVerkaufspotenzial.sql';
            if (currentStep === 'abgabe') sqlFile = 'getExterneAbgabeVorbereitung.sql';

            const myTable = new TableRenderer('table-app-id', sqlFile);
            myTable.init();
        }
    }, [currentStep]);

    return (
        <section className="relative">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-mars-accent/10 border border-mars-accent/20 text-mars-accent shadow-[0_0_15px_rgba(227,88,76,0.1)]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                            <line x1="7" y1="7" x2="7.01" y2="7" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">Ressourcen-Veräußerung</h3>
                        <p className="text-sm text-gray-400">BP2: Wirtschaftliche Bewertung und Vorbereitung externer Abgaben</p>
                    </div>
                </div>

                <div className="hidden sm:block">
                    <span className="px-3 py-1 rounded-full border border-white/5 bg-white/5 text-[10px] uppercase tracking-widest text-gray-400 font-medium">
                        Mars Logistik Verwaltung [ALS]
                    </span>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6 border-b border-white/5 pb-4">
                <button
                    onClick={() => setCurrentStep('ueberschuss')}
                    className={`px-4 py-2 text-xs font-medium tracking-wider uppercase rounded-lg border transition-all duration-200 ${
                        currentStep === 'ueberschuss'
                            ? 'bg-mars-accent/10 border-mars-accent/40 text-mars-accent shadow-[0_0_10px_rgba(227,88,76,0.05)]'
                            : 'border-white/5 bg-white/5 text-gray-400 hover:text-white hover:border-white/10'
                    }`}
                >
                    1. Überschuss & Bestand prüfen
                </button>
                <button
                    onClick={() => setCurrentStep('potenzial')}
                    className={`px-4 py-2 text-xs font-medium tracking-wider uppercase rounded-lg border transition-all duration-200 ${
                        currentStep === 'potenzial'
                            ? 'bg-mars-accent/10 border-mars-accent/40 text-mars-accent shadow-[0_0_10px_rgba(227,88,76,0.05)]'
                            : 'border-white/5 bg-white/5 text-gray-400 hover:text-white hover:border-white/10'
                    }`}
                >
                    2. Verkaufspotenzial bewerten
                </button>
                <button
                    onClick={() => setCurrentStep('abgabe')}
                    className={`px-4 py-2 text-xs font-medium tracking-wider uppercase rounded-lg border transition-all duration-200 ${
                        currentStep === 'abgabe'
                            ? 'bg-mars-accent/10 border-mars-accent/40 text-mars-accent shadow-[0_0_10px_rgba(227,88,76,0.05)]'
                            : 'border-white/5 bg-white/5 text-gray-400 hover:text-white hover:border-white/10'
                    }`}
                >
                    3. Externe Abgabe vorbereiten
                </button>
            </div>

            <div
                id="table-app-id"
                ref={tableContainerRef}
                className="transition-all duration-500 ease-in-out min-h-[200px]"
            >
                <div className="flex items-center gap-4 p-10 text-gray-500 bg-[#071422]/30 rounded-xl border border-white/5 shadow-inner">
                    <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-mars-accent animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 rounded-full bg-mars-accent animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 rounded-full bg-mars-accent animate-bounce"></div>
                    </div>
                    <span className="text-sm font-light tracking-widest uppercase">
                        {currentStep === 'ueberschuss' && "Berechne Ressourcenüberschüsse..."}
                        {currentStep === 'potenzial' && "Verbinde Überschussbewertungen..."}
                        {currentStep === 'abgabe' && "Lade vorbereitete Veräußerungen..."}
                    </span>
                </div>
            </div>
        </section>
    );
};

export default Sales;