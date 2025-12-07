import { useState, useEffect } from 'react';
import Sidebar, { type Section } from './components/Sidebar';
import { calculateMarsSolDate } from './utils/marsTime';

import Overview from './pages/Overview';
import Vehicles from './pages/Vehicles';
// (Importiere Firebase Auth hier, wenn benötigt)

function App() {
  const [activeSection, setActiveSection] = useState<Section>('overview');
  const [marsDate, setMarsDate] = useState({ sol: 0, time: '00:00' });

  // Sol-Datum beim Start berechnen
  useEffect(() => {
    const updateTime = () => {
        const { sol, time } = calculateMarsSolDate(new Date());
        setMarsDate({ sol, time });
    };
    updateTime();
    // Intervall setzen, um Zeit live zu aktualisieren
    const timer = setInterval(updateTime, 60000); 
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    console.log("Logout Logik hier...");
    alert("Abgemeldet!");
  };

  return (
    <div className="h-screen w-full flex flex-col md:flex-row bg-bg-dark text-white overflow-hidden">
      
      {/* Sidebar Navigation */}
      <Sidebar 
        activeSection={activeSection} 
        setSection={setActiveSection} 
        onLogout={handleLogout} 
      />

      {/* Hauptinhalt */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10 bg-bg-dark relative">
        {/* Header */}
        <header className="mb-8 pb-4 border-b border-mars-red-deep/50 flex justify-between items-center sticky top-0 bg-bg-dark/95 backdrop-blur z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold capitalize">
                {activeSection === 'overview' ? 'Übersicht & Logistik' : activeSection}
            </h2>
            <div className="text-sm text-gray-400 text-right">
                Mitarbeiter: <span className="text-mars-accent">Tom Coombs</span> <br/>
                Sol: <b>{marsDate.sol}</b> ({marsDate.time})
            </div>
        </header>

        {/* Dynamischer Inhalt basierend auf State */}
        <div className="space-y-10 animate-fade-in">
            
            {activeSection === 'overview' && (
              <Overview />
            )}

            {activeSection === 'vehicles' && (
              <Vehicles />
            )}

            {/* Weitere Sektoren (Cities, Employees, etc.) hinzufügen... */}

        </div>
      </main>
    </div>
  );
}

export default App;