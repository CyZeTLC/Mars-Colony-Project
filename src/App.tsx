import { useState, useEffect } from 'react';
import Sidebar, { type Section } from './components/Sidebar';
import { calculateMarsSolDate } from './utils/marsTime';
import { getSectionTitle } from './utils/sectionTitle';
import { AuthService } from './utils/AuthService.ts';

import Overview from './pages/Overview';
import Vehicles from './pages/Vehicles';
import Employees from './pages/Employees';
import SqlOverview from './pages/SqlOverview';

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
    AuthService.logout();
  };

  const auth = new AuthService('https://hsbi.cyzetlc.de/dev/api/login.php');
  document.getElementById('login-btn')?.addEventListener('click', () => auth.login());

  if (AuthService.isLoggedIn()) {
    return (
      <div className="h-screen w-full flex flex-col md:flex-row bg-bg-dark text-white overflow-hidden">

        {/* Sidebar Navigation */}
        <Sidebar
          activeSection={activeSection}
          setSection={setActiveSection}
          onLogout={handleLogout}
        />

        {/* Hauptinhalt */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 relative">
          {/* Header */}
          <header className="mb-8 pb-4 border-b border-mars-red-deep/50 flex justify-between items-center sticky top-0 bg-bg-dark/95 backdrop-blur z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold capitalize">
              {getSectionTitle(activeSection)}
            </h2>
            <div className="text-sm text-gray-400 text-right">
              Mitarbeiter: <span className="text-mars-accent">Tom Coombs</span> <br />
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

            {activeSection === 'employees' && (
              <Employees />
            )}

            {activeSection === 'sql' && (
              <SqlOverview />
            )}

            {/* Weitere Sektoren (Cities, Employees, etc.) hinzufügen... */}

          </div>
        </main>
      </div>
    );
  } else {
    return (
      <section className="min-h-screen flex items-center justify-center bg-bg-dark">
        <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-8 w-full max-w-md backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-6 text-center text-mars-accent">ALS LOGIN</h2>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium mb-1">Benutzername</label>
            <input type="text" id="username" className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-mars-accent" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-1">Passwort</label>
            <input type="password" id="password" className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-mars-accent" />
          </div>
          <div id="error-msg" className="text-red-400 text-sm mb-4 hidden"></div>
          <button id="login-btn" className="w-full bg-mars-accent hover:bg-mars-accent-dark text-white font-semibold py-2 px-4 rounded transition-colors">Anmelden</button>
        </div>
      </section>
    );
  }
}

export default App;