import StatusCard from '../components/dashboard/StatusCard';
import { useEffect, useState } from 'react';
import { apiFetch } from '../utils/restApi';
import { RessourcesChart, type RessourcesData } from '../components/dashboard/RessourcesChart';

interface DashboardStats {
    citizens_count: Array<{ citizens_count: number; minors_count: number }>;
    cities_count: Array<{ cities_count: number }>;
    energy_power: Array<{ current_energy_power: number }>;
    vehicles: Array<{ active_vehicles_count: number; inactive_vehicles_count: number; total_vehicles_count: number }>;
}

const Overview = () => {
    const [data, setData] = useState<RessourcesData[]>([]);
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [loadingGraph, setLoadingGraph] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const data = await apiFetch<DashboardStats>('get_dashboard_stats');
                console.log("Dashboard Stats:", data);
                setStats(data);
            } catch (error) {
                console.error("Fehler beim Laden der Städte:", error);
            } finally {
                setLoading(false);
            }
        }

        setTimeout(() => {
            setData([
                { name: 'Jan', amount: 400 },
                { name: 'Feb', amount: 300 },
                { name: 'Mär', amount: 350 },
                { name: 'Apr', amount: 420 },
                { name: 'Mai', amount: 480 },
                { name: 'Jun', amount: 550 },
                { name: 'Jul', amount: 600 },
                { name: 'Aug', amount: 580 },
                { name: 'Sep', amount: 490 },
                { name: 'Okt', amount: 410 },
                { name: 'Nov', amount: 370 },
                { name: 'Dez', amount: 450 }
            ]); setLoadingGraph(false);
        }, 2000);

        loadData();
    }, []);

    const totalCities = stats?.cities_count[0]?.cities_count ?? 0;
    const totalCitizens = stats?.citizens_count[0]?.citizens_count ?? 0;
    const minorCitizens = stats?.citizens_count[0]?.minors_count ?? 0;
    const activeVehicles = stats?.vehicles[0]?.active_vehicles_count ?? 0;
    const totalVehicles = stats?.vehicles[0]?.total_vehicles_count ?? 0;
    const energyPower = stats?.energy_power[0]?.current_energy_power ?? 0;

    return (
        <section>
            <h3 className="text-2xl font-semibold text-mars-accent mb-4">Missions-Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatusCard title="Städte" value={loading ? "..." : totalCities} color="text-green-400" borderColor="border-green-500/50" />
                <StatusCard title="Aktive Fahrzeuge" value={loading ? "..." : activeVehicles + "/" + totalVehicles} color="text-mars-accent" borderColor="border-mars-accent/50" />
                <StatusCard title="Energie-Leistung" value={loading ? "..." : energyPower + " MW"} color="text-mars-red-deep" borderColor="border-mars-red-deep/50" />
                <StatusCard title="Bevölkerung" value={loading ? "..." : totalCitizens + " (" + minorCitizens + ")"} color="text-white" borderColor="border-gray-600" />
            </div>
            <div className="mt-8">
                <h4 className="text-xl font-bold text-mars-accent mb-4">Ressourcenverbrauch (letzte 30 Tage)</h4>
                <RessourcesChart data={data} isLoading={loadingGraph} />
            </div>
        </section>
    );
}

export default Overview;