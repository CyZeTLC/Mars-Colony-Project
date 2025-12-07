import React from 'react';

export type Section = 'overview' | 'cities' | 'inhabitants' | 'employees' | 'vehicles';

interface SidebarProps {
    activeSection: Section;
    setSection: (section: Section) => void;
    onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setSection, onLogout }) => {
    const navItems: { id: Section; label: string; icon: string }[] = [
        { id: 'overview', label: 'Übersicht & Logistik', icon: '🚀' },
        { id: 'cities', label: 'Kolonie-Standorte', icon: '🏠' },
        { id: 'inhabitants', label: 'Bewohner-Management', icon: '🧑‍🤝‍🧑' },
        { id: 'employees', label: 'Mitarbeiter-Datenbank', icon: '👷' },
        { id: 'vehicles', label: 'Fahrzeugflotte', icon: '🚜' },
    ];

    return (
        <nav className="w-full md:w-64 bg-nav-bg border-r border-mars-red-deep/50 p-4 flex-shrink-0 flex flex-col h-full">
            <div className="text-2xl font-bold text-mars-accent mb-8 border-b border-gray-700 pb-4">
                ALS-Control
            </div>

            <ul className="space-y-2 flex-1">
                {navItems.map((item) => (
                    <li key={item.id}>
                        <button
                            onClick={() => setSection(item.id)}
                            className={`w-full text-left px-4 py-2 rounded-lg transition duration-150 flex items-center ${
                                activeSection === item.id
                                    ? 'bg-mars-red-deep/20 text-white shadow-mars-glow'
                                    : 'text-gray-400 hover:bg-mars-red-deep/30 hover:text-white'
                            }`}
                        >
                            <span className="mr-2">{item.icon}</span> {item.label}
                        </button>
                    </li>
                ))}
            </ul>

            <div className="mt-8 pt-4 border-t border-gray-700/50">
                <button 
                    onClick={onLogout}
                    className="w-full px-4 py-2 text-sm text-red-400 bg-red-900/30 rounded-lg hover:bg-red-900/50 transition">
                    Abmelden
                </button>
            </div>
        </nav>
    );
};

export default Sidebar;