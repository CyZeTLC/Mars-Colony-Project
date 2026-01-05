import StatusCard from '../components/StatusCard';

const Overview = () => {
    return (
        <section>
            <h3 className="text-2xl font-semibold text-mars-accent mb-4">Missions-Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatusCard title="Städte" value="10" color="text-green-400" borderColor="border-green-500/50" />
                <StatusCard title="Aktive Fahrzeuge" value="15/18" color="text-mars-accent" borderColor="border-mars-accent/50" />
                <StatusCard title="Energie-Leistung" value="17 MW" color="text-mars-red-deep" borderColor="border-mars-red-deep/50" />
                <StatusCard title="Bevölkerung" value="453" color="text-white" borderColor="border-gray-600" />
            </div>
        </section>
    );
}

export default Overview;