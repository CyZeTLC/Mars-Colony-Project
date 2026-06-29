import {
    ResourceConsumptionChart,
    ResourceStockLevelChart,
    type ConsumptionRecord,
    type StockLevel,
} from '@/components/dashboard/ResourceGraphs';
import StatusCard from '@/components/dashboard/StatusCard';
import Weather from '@/components/dashboard/Weather';
import { apiFetch } from '@/utils/restApi';
import { useEffect, useState } from 'react';

interface DashboardStats {
    citizens_count: Array<{
        citizens_count: number;
        minors_count: number;
    }>;
    cities_count: Array<{ cities_count: number }>;
    energy_power: Array<{ current_energy_power: number }>;
    vehicles: Array<{
        active_vehicles_count: number;
        inactive_vehicles_count: number;
        total_vehicles_count: number;
    }>;
}

interface SqlResponse<T> {
    result: T[];
}

interface ConsumptionApiRow {
    datum: string;
    ressource: string;
    einheit: string | null;
    verbrauch: number | string;
}

interface StockLevelApiRow {
    ressource: string;
    bestand: number | string;
    mindestbestand: number | string;
    einheit: string | null;
    prozent: number | string;
}

const Overview = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [consumptionData, setConsumptionData] = useState<ConsumptionRecord[]>(
        [],
    );
    const [stockData, setStockData] = useState<StockLevel[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingGraphs, setLoadingGraphs] = useState(true);

    useEffect(() => {
        async function loadDashboard() {
            try {
                const response = await apiFetch<DashboardStats>(
                    'get_dashboard_stats',
                );
                setStats(response);
            } catch (error) {
                console.error('Dashboard-Statistiken konnten nicht geladen werden:', error);
            } finally {
                setLoading(false);
            }
        }

        async function loadResourceGraphs() {
            try {
                const [consumptionResponse, stockResponse] = await Promise.all([
                    apiFetch<SqlResponse<ConsumptionApiRow>>(
                        'get_sql_result&file=getResourceConsumptionHistory.sql',
                    ),
                    apiFetch<SqlResponse<StockLevelApiRow>>(
                        'get_sql_result&file=getResourceStockLevels.sql',
                    ),
                ]);

                setConsumptionData(
                    consumptionResponse.result.map((row) => ({
                        date: row.datum,
                        resource: row.ressource,
                        amount: Number(row.verbrauch),
                        unit: row.einheit ?? '',
                    })),
                );

                setStockData(
                    stockResponse.result.map((row) => ({
                        resource: row.ressource,
                        currentAmount: Number(row.bestand),
                        minimumAmount: Number(row.mindestbestand),
                        unit: row.einheit ?? '',
                        percentage: Number(row.prozent),
                    })),
                );
            } catch (error) {
                console.error('Ressourcen-Graphen konnten nicht geladen werden:', error);
            } finally {
                setLoadingGraphs(false);
            }
        }

        void loadDashboard();
        void loadResourceGraphs();
    }, []);

    const totalCities = stats?.cities_count[0]?.cities_count ?? 0;
    const totalCitizens = stats?.citizens_count[0]?.citizens_count ?? 0;
    const minorCitizens = stats?.citizens_count[0]?.minors_count ?? 0;
    const activeVehicles = stats?.vehicles[0]?.active_vehicles_count ?? 0;
    const totalVehicles = stats?.vehicles[0]?.total_vehicles_count ?? 0;
    const energyPower = stats?.energy_power[0]?.current_energy_power ?? 0;

    return (
        <section>
            <h3 className="mb-4 text-2xl font-semibold text-mars-accent">
                Missions-Status
            </h3>

            <div className="flex w-full flex-col gap-4 xl:flex-row">
                <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
                    <StatusCard
                        title="Städte"
                        value={loading ? '...' : totalCities}
                        color="text-green-400"
                        borderColor="border-green-500/50"
                    />
                    <StatusCard
                        title="Aktive Fahrzeuge"
                        value={
                            loading ? '...' : `${activeVehicles}/${totalVehicles}`
                        }
                        color="text-mars-accent"
                        borderColor="border-mars-accent/50"
                    />
                    <StatusCard
                        title="Energie-Leistung"
                        value={loading ? '...' : `${energyPower} MW`}
                        color="text-mars-red-deep"
                        borderColor="border-mars-red-deep/50"
                    />
                    <StatusCard
                        title="Bevölkerung"
                        value={
                            loading
                                ? '...'
                                : `${totalCitizens} (${minorCitizens})`
                        }
                        color="text-white"
                        borderColor="border-gray-600"
                    />
                </div>

                <Weather />
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
                <div className="rounded-lg border border-gray-700 bg-secondary p-6 shadow-lg">
                    <h4 className="mb-4 text-xl font-bold text-mars-accent">
                        Ressourcenverbrauch
                    </h4>
                    <ResourceConsumptionChart
                        data={consumptionData}
                        isLoading={loadingGraphs}
                    />
                </div>

                <div className="rounded-lg border border-gray-700 bg-secondary p-6 shadow-lg">
                    <h4 className="mb-4 text-xl font-bold text-mars-accent">
                        Bestand vs. Mindestbestand
                    </h4>
                    <ResourceStockLevelChart
                        data={stockData}
                        isLoading={loadingGraphs}
                    />
                </div>
            </div>
        </section>
    );
};

export default Overview;
