import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
} from 'recharts';
import { GraphSkeleton } from '../ui/Skeleton';

export interface RessourcesData {
    name: string;
    amount: number;
}

interface Props {
    data: RessourcesData[];
    isLoading: boolean;
}

export const RessourcesChart = ({ data, isLoading }: Props) => {
    if (isLoading) {
        return <GraphSkeleton />;
    }

    const accentColor = "var(--accent)";

    return (
        <div
            style={{ width: '100%', height: 300 }}
            className="pointer-events-none select-none"
        >
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={accentColor} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={accentColor} stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid
                        vertical={false}
                        strokeDasharray="3 3"
                        stroke="#e5e7eb"
                    />

                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                        dy={10}
                    />

                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                    />

                    <Area
                        type="monotone"
                        dataKey="amount"
                        stroke={accentColor}
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorAmount)"
                        animationDuration={1200}
                        animationEasing="ease-in-out"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};