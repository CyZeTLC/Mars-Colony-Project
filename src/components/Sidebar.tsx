import React, { useState } from 'react';

export type Section = 'overview' | 'cities' | 'inhabitants' | 'employees' | 'vehicles' | 'sql' | 'ressources';

interface SidebarProps {
    activeSection: Section;
    setSection: (section: Section) => void;
    onLogout: () => void;
}

const Icon: React.FC<{ name: Section | 'logout' | 'toggle'; className?: string }> = ({ name, className }) => {
    const common = { width: 20, height: 20, className: className ?? 'inline-block' };
    switch (name) {
        case 'overview':
            return (
                <svg {...common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 2l3 6 6 .5-4.5 3.5L19 21l-7-4-7 4 1.5-8L2 8.5 8 8 12 2z" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case 'cities':
            return (
                <svg {...common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M3 21v-8l6-4 6 4v8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 10V6h6v4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case 'inhabitants':
            return (
                <svg {...common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M16 11a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" strokeWidth="1.2" />
                    <path d="M2 21c1.5-4 6-6 10-6s8.5 2 10 6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case 'employees':
            return (
                <svg {...common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="7" r="4" strokeWidth="1.2" />
                </svg>
            );
        case 'vehicles':
            return (
                <svg {...common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="1" y="7" width="15" height="10" rx="2" strokeWidth="1.2" />
                    <path d="M16 12h4l2 3" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="5.5" cy="17.5" r="1.5" strokeWidth="1.2" />
                    <circle cx="18.5" cy="17.5" r="1.5" strokeWidth="1.2" />
                </svg>
            );
        case 'ressources':
            return (
                <svg {...common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="1" y="7" width="15" height="10" rx="2" strokeWidth="1.2" />
                    <path d="M16 12h4l2 3" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="5.5" cy="17.5" r="1.5" strokeWidth="1.2" />
                    <circle cx="18.5" cy="17.5" r="1.5" strokeWidth="1.2" />
                </svg>
            );
        case 'sql':
            return (
                <svg {...common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M3 7c0 4 4 8 9 8s9-4 9-8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 7l9 4 9-4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case 'logout':
            return (
                <svg {...common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M16 17l5-5-5-5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M21 12H9" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13 19H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h7" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case 'toggle':
            return (
                <svg {...common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        default:
            return null;
    }
};

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setSection, onLogout }) => {
    const [collapsed, setCollapsed] = useState(false);

    const navItems: { id: Section; label: string }[] = [
        { id: 'overview', label: 'Übersicht & Logistik' },
        { id: 'cities', label: 'Kolonie-Standorte' },
        { id: 'inhabitants', label: 'Bewohner-Management' },
        { id: 'employees', label: 'Mitarbeiter-Datenbank' },
        { id: 'vehicles', label: 'Fahrzeugflotte' },
        { id: 'ressources', label: 'Ressourcen & Lager' },
        { id: 'sql', label: 'SQL-Queries' },
    ];

    return (
        <nav
            aria-label="Hauptnavigation"
            className={`flex flex-col h-full transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} bg-gradient-to-b from-[#071422]/60 to-[#03101a]/60 backdrop-blur-md border-r border-white/5 p-3`}
        >
            <div className={`relative flex items-center mb-6 ${collapsed ? 'justify-center pr-14 h-14' : 'justify-between'}`}>
                <div className="flex items-center gap-3">
                    {!collapsed ? (
                        <div className="rounded-md p-2 bg-mars-accent/10 text-mars-accent">
                            {/* Logo */}
                            {/* <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M12 2l3 6 6 .5-4.5 3.5L19 21l-7-4-7 4 1.5-8L2 8.5 8 8 12 2z" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg> */}
                            <img src="./logo.png" alt="ALS-Control Logo" className="w-6 h-6" />
                        </div>
                    ) : (
                        // Platzhalter, damit das Layout zentriert bleibt (Logo ausgeblendet)
                        <div className="w-6" aria-hidden />
                    )}
                    {!collapsed && <div className="text-lg font-semibold text-mars-accent">ALS-Control</div>}
                </div>

                <button
                    aria-label={collapsed ? 'Erweitern' : 'Minimieren'}
                    onClick={() => setCollapsed((s) => !s)}
                    title={collapsed ? 'Erweitern' : 'Minimieren'}
                    className={`${collapsed ? 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-1.5' : 'p-2'} rounded-md text-gray-300 hover:bg-white/5 transition z-20`}
                >
                    <Icon name="toggle" className="text-gray-300" />
                </button>
            </div>

            <ul className="flex-1 space-y-1">
                {navItems.map((item) => {
                    const active = activeSection === item.id;
                    return (
                        <li key={item.id} className="relative">
                            <button
                                onClick={() => setSection(item.id)}
                                title={collapsed ? item.label : undefined}
                                className={`w-full flex items-center gap-3 py-2 px-2 rounded-lg group transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-mars-accent/40 ${active
                                    ? 'bg-gradient-to-r from-mars-accent/10 to-mars-red-deep/10 text-white shadow-[0_6px_20px_rgba(227,88,76,0.08)]'
                                    : 'text-gray-300 hover:bg-white/5'
                                    }`}
                            >
                                <span
                                    className={`flex items-center justify-center w-10 h-10 rounded-md ${active ? 'bg-gradient-to-br from-mars-accent to-mars-red-deep text-white' : 'bg-white/3 text-gray-200 group-hover:bg-white/5'
                                        }`}
                                >
                                    <Icon name={item.id} className="text-inherit" />
                                </span>

                                {!collapsed && (
                                    <span className="flex-1 text-left text-sm">
                                        <div className="font-medium">{item.label}</div>
                                        {/* subtitle */}
                                        <div className="text-xs text-gray-400">{active ? 'Aktiv' : 'Anzeigen'}</div>
                                    </span>
                                )}

                                {/* Active left indicator */}
                                {active && !collapsed && (
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 rounded-r-full bg-gradient-to-b from-mars-accent to-mars-red-deep shadow-lg"></span>
                                )}
                            </button>
                        </li>
                    );
                })}
            </ul>

            <div className="pt-4 border-t border-white/5 mt-4">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-white/6 flex items-center justify-center text-white/90">T</div>
                    {!collapsed && (
                        <div className="flex-1">
                            <div className="text-sm font-medium text-white">{localStorage.getItem('username')}</div>
                            <div className="text-xs text-gray-400">Alle Rechte</div>
                        </div>
                    )}
                    <button
                        onClick={() => setCollapsed((s) => !s)}
                        title="Account Menü"
                        className="p-2 rounded-md text-gray-300 hover:bg-white/5 transition hidden"
                    >
                        {/* placeholder for dropdown */}
                    </button>
                </div>

                <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 justify-center sm:justify-start py-2 px-2 rounded-lg text-sm font-medium bg-red-900/30 text-red-300 hover:bg-red-900/50 transition"
                >
                    <span className="flex items-center justify-center w-8 h-8 rounded-md bg-red-800/40">
                        <Icon name="logout" />
                    </span>
                    {!collapsed && <span>Abmelden</span>}
                </button>
            </div>
        </nav>
    );
};

export default Sidebar;