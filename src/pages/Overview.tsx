import StatusCard from '../components/StatusCard';
import { DataGrid, type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid';
import { Chip, Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';

interface CriticalResourceRow {
    id: number;
    resourceName: string;
    currentLevel: number;
    unit: string;
    consequence: string;
    priority: 'KRITISCH' | 'HOCH' | 'MITTEL';
}

const criticalResources: CriticalResourceRow[] = [
    { id: 1, resourceName: 'Sauerstoff (LOX)', currentLevel: 7, unit: '%', consequence: 'Nur für 1,2 Tage Lebensunterstützung.', priority: 'KRITISCH' },
    { id: 2, resourceName: 'Notfall-Treibstoff (Hydrazin)', currentLevel: 15, unit: '%', consequence: 'Nur noch 2 Notstarts möglich.', priority: 'HOCH' },
    { id: 3, resourceName: 'Wasservorrat (H2O)', currentLevel: 15, unit: '%', consequence: 'Recycling-Pumpe A defekt. 3 Tage Reserve.', priority: 'HOCH' },
    { id: 4, resourceName: 'Lithium-Ionen-Puffer', currentLevel: 18, unit: '%', consequence: 'Nur 4 Stunden Puffer für Hauptsysteme.', priority: 'MITTEL' },
];

const columns: GridColDef<CriticalResourceRow>[] = [
    {
        field: 'priority',
        headerName: 'Priorität',
        width: 150,
        renderCell: (params: GridRenderCellParams<CriticalResourceRow, 'priority'>) => {
            const isCritical = params.value === 'KRITISCH';     // Need rework on statement (vscode warning)
            return (
                <Chip
                    label={params.value}
                    color={isCritical ? 'error' : 'warning'}
                    icon={isCritical ? <ErrorIcon /> : <WarningIcon />}
                    size="small"
                />
            );
        },
    },
    { field: 'resourceName', headerName: 'Ressource', width: 250 },
    {
        field: 'currentLevel',
        headerName: 'Füllstand',
        width: 150,

        renderCell: (params: GridRenderCellParams<CriticalResourceRow, 'currentLevel'>) => (
            <Typography
                fontWeight="bold"
                color={params.row.currentLevel < 10 ? 'error' : 'warning.main'}
            >
                {params.value}{params.row.unit}
            </Typography>
        ),
    },
    {
        field: 'consequence',
        headerName: 'Logistische Konsequenz',
        flex: 1,
    },
];

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
            <div className="mb-8 mt-8 backdrop-blur z-10" style={{ height: 350, width: '100%' }}>
                <Typography variant="h5" gutterBottom sx={{ color: 'error.main' }}>
                    Alarmstufe Rot: Kritischer Ressourcenstatus
                </Typography>
                <DataGrid
                    rows={criticalResources}
                    columns={columns}

                    initialState={{
                        pagination: { paginationModel: { pageSize: 100 } },
                    }}
                    pageSizeOptions={[]}
                    disableRowSelectionOnClick
                    disableColumnMenu
                />
            </div>
        </section>
    );
}

export default Overview;