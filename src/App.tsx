import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AuthService } from './utils/AuthService.ts';

import Overview from './pages/Overview';
import Vehicles from './pages/Vehicles';
import Employees from './pages/Employees';
import SqlOverview from './pages/SqlOverview';
import Ressources from './pages/Ressources';
import LoginPage from './pages/Login';
import Citizens from './pages/Citizens.tsx';
import Cities from './pages/Cities.tsx';
import Layout from './components/Layout.tsx';
import City from "./pages/city/[cityname]/page.tsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(AuthService.isLoggedIn());

  return isLoggedIn ? (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Overview />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="employees" element={<Employees />} />
          <Route path="sql" element={<SqlOverview />} />
          <Route path="ressources" element={<Ressources />} />
          <Route path="citizens" element={<Citizens />} />
          <Route path="cities" element={<Cities />} />
          <Route path="city/:name" element={<City />} />
        </Route>
      </Routes>
    </BrowserRouter>
  ) : (
    <LoginPage onLogin={() => setIsLoggedIn(true)} />
  );
}

export default App;