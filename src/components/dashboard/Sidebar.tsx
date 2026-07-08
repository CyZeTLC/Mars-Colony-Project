import React, { useState } from 'react';
import { AuthService } from '../../utils/AuthService';
import { NavLink } from 'react-router-dom';

export type Section = 'overview' | 'cities' | 'inhabitants' | 'employees' | 'vehicles' | 'sql' | 'ressources' | 'sales' | 'restock';

const handleLogout = () => {
    AuthService.logout();
};

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
                    <g strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </g>
                </svg>
            );
        case 'employees':
            return (
                <svg {...common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <g strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="5" y="4" width="14" height="17" rx="2" />
                        <path d="M9 4V3h6v1" />
                        <circle cx="12" cy="11" r="2.5" />
                        <path d="M7.5 17c0-2 2-2.5 4.5-2.5s4.5.5 4.5 2.5" />
                    </g>
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
                    <g strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 2 7 12 12 22 7 12 2" />
                        <polyline points="2 12 12 17 22 12" />
                        <polyline points="2 17 12 22 22 17" />
                    </g>
                </svg>
            );
        case 'sales':
            return (
                <svg {...common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                    <line x1="7" y1="7" x2="7.01" y2="7" strokeWidth="2" strokeLinecap="round" />
                </svg>
            );
        case 'sql':
            return (
                <svg {...common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <g strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <ellipse cx="11" cy="6" rx="8" ry="3" />
                        <path d="M3 6v11c0 1.66 3.58 3 8 3 1.25 0 2.43-.17 3.5-.47" />
                        <path d="M3 12c0 1.66 3.58 3 8 3 1.5 0 2.89-.2 4-.55" />
                        <path d="M19 6v5" />
                        <circle cx="17" cy="17" r="4" />
                        <line x1="19.8" y1="19.8" x2="22" y2="22" />
                    </g>
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
        case 'restock':
            return (
                <svg {...common} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                        d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            );
        default:
            return null;
    }
};

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    const navItems: { id: Section; label: string; path: string }[] = [
        { id: 'overview', label: 'Übersicht & Logistik', path: '/' },
        { id: 'cities', label: 'Kolonie-Standorte', path: '/cities' },
        { id: 'inhabitants', label: 'Bewohner-Management', path: '/citizens' },
        { id: 'employees', label: 'Mitarbeiter-Datenbank', path: '/employees' },
        { id: 'vehicles', label: 'Fahrzeugflotte', path: '/vehicles' },
        { id: 'ressources', label: 'Ressourcen & Lager', path: '/ressources' },
        { id: 'sales', label: 'Verkauf', path: '/sales' },
        { id: 'restock', label: 'Nachbestellung', path: '/restock' },
        { id: 'sql', label: 'SQL-Queries', path: '/sql' },
    ];

    return (
        <nav
            aria-label="Hauptnavigation"
            className={`flex flex-col h-full transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} bg-primary backdrop-blur-md border-r border-white/5 p-3`}
        >
            <div className={`relative flex items-center mb-6 ${collapsed ? 'justify-center pr-14 h-14' : 'justify-between'}`}>
                <div className="flex items-center gap-3">
                    {!collapsed ? (
                        <div className="rounded-md p-2 bg-mars-accent/10 text-mars-accent">
                            <img src="/logo.png" alt="ALS-Control Logo" className="w-6 h-6" />
                        </div>
                    ) : (
                        // Platzhalter, damit das Layout zentriert bleibt
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
                    return (
                        <li key={item.id} className="relative">
                            <NavLink
                                to={item.path}
                                title={collapsed ? item.label : undefined}
                                className={({ isActive }) =>
                                    `w-full flex items-center gap-3 py-2 px-2 rounded-lg group transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-mars-accent/40 ${isActive
                                        ? "bg-gradient-to-r from-mars-accent/10 to-mars-red-deep/10 text-white shadow-[0_6px_20px_rgba(227,88,76,0.08)]"
                                        : "text-gray-300 hover:bg-white/5"
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <span
                                            className={`flex items-center justify-center w-10 h-10 rounded-md ${isActive
                                                ? "bg-gradient-to-br from-mars-accent to-mars-red-deep text-white"
                                                : "bg-white/3 text-gray-200 group-hover:bg-white/5"
                                                }`}
                                        >
                                            <Icon name={item.id} className="text-inherit" />
                                        </span>

                                        {!collapsed && (
                                            <span className="flex-1 text-left text-sm">
                                                <div className="font-medium">{item.label}</div>
                                                <div className="text-xs text-gray-400">
                                                    {isActive ? "Aktiv" : "Anzeigen"}
                                                </div>
                                            </span>
                                        )}

                                        {isActive && !collapsed && (
                                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 rounded-r-full bg-gradient-to-b from-mars-accent to-mars-red-deep shadow-lg"></span>
                                        )}
                                    </>
                                )}
                            </NavLink>
                        </li>
                    );
                })}
            </ul>

            <div className="pt-4 border-t border-white/5 mt-4">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-white/6 flex items-center justify-center text-white/90">{localStorage.getItem('username')?.charAt(0).toUpperCase() || 'U'}</div>
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
                    </button>
                </div>

                <button
                    onClick={handleLogout}
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