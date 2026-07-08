import { useMemo, useState } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Line,
    LineChart,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { GraphSkeleton } from '../ui/Skeleton';

export interface ConsumptionRecord {
    date: string;
    resource: string;
    amount: number;
    unit: string;
}

export interface StockLevel {
    resource: string;
    currentAmount: number;
    minimumAmount: number;
    unit: string;
    percentage: number;
}

type MonthRange = 1 | 3 | 6 | 12;

interface ConsumptionChartProps {
    data: ConsumptionRecord[];
    isLoading: boolean;
}

interface StockLevelChartProps {
    data: StockLevel[];
    isLoading: boolean;
}

interface ConsumptionPoint {
    period: string;
    amount: number;
}

const RESOURCE_OPTIONS = ['Wasser', 'Sauerstoff', 'Nahrung'] as const;
const RANGE_OPTIONS: MonthRange[] = [12, 6, 3, 1];

const dayFormatter = new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: '2-digit',
});

const monthFormatter = new Intl.DateTimeFormat('de-DE', {
    month: 'short',
    year: '2-digit',
});

function toDayKey(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function toMonthKey(date: Date) {
    return toDayKey(date).slice(0, 7);
}

function buildConsumptionSeries(
    records: ConsumptionRecord[],
    resource: string,
    range: MonthRange,
): ConsumptionPoint[] {
    const totals = new Map<string, number>();

    for (const record of records) {
        if (record.resource !== resource) {
            continue;
        }

        const key = range === 1 ? record.date : record.date.slice(0, 7);
        totals.set(key, (totals.get(key) ?? 0) + record.amount);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (range === 1) {
        return Array.from({ length: 30 }, (_, index) => {
            const date = new Date(today);
            date.setDate(today.getDate() - (29 - index));
            const period = toDayKey(date);

            return {
                period,
                amount: Number((totals.get(period) ?? 0).toFixed(2)),
            };
        });
    }

    return Array.from({ length: range }, (_, index) => {
        const date = new Date(
            today.getFullYear(),
            today.getMonth() - (range - 1 - index),
            1,
        );
        const period = toMonthKey(date);

        return {
            period,
            amount: Number((totals.get(period) ?? 0).toFixed(2)),
        };
    });
}

function formatPeriod(period: string, range: MonthRange) {
    const value = range === 1 ? `${period}T12:00:00` : `${period}-01T12:00:00`;
    const date = new Date(value);

    return range === 1 ? dayFormatter.format(date) : monthFormatter.format(date);
}

function getStockColor(percentage: number) {
    if (percentage < 100) {
        return '#ef4444';
    }

    if (percentage < 150) {
        return '#f97316';
    }

    return '#22c55e';
}

export function ResourceConsumptionChart({
    data,
    isLoading,
}: ConsumptionChartProps) {
    const [selectedResource, setSelectedResource] = useState('Wasser');
    const [selectedRange, setSelectedRange] = useState<MonthRange>(12);

    const chartData = useMemo(
        () => buildConsumptionSeries(data, selectedResource, selectedRange),
        [data, selectedResource, selectedRange],
    );

    const selectedUnit =
        data.find((record) => record.resource === selectedResource)?.unit ?? '';
    const hasData = data.some((record) => record.resource === selectedResource);

    if (isLoading) {
        return <GraphSkeleton />;
    }

    return (
        <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <select
                    value={selectedResource}
                    onChange={(event) => setSelectedResource(event.target.value)}
                    aria-label="Ressource auswählen"
                    className="rounded-md border border-gray-700 bg-[#151515] px-3 py-2 text-sm text-gray-200 outline-none transition-colors focus:border-mars-accent"
                >
                    {RESOURCE_OPTIONS.map((resource) => (
                        <option key={resource} value={resource}>
                            {resource}
                        </option>
                    ))}
                </select>

                <div
                    className="flex rounded-md border border-gray-700 bg-[#151515] p-1"
                    aria-label="Zeitraum auswählen"
                >
                    {RANGE_OPTIONS.map((range) => (
                        <button
                            key={range}
                            type="button"
                            onClick={() => setSelectedRange(range)}
                            className={`rounded px-3 py-1.5 text-xs font-semibold transition-colors ${selectedRange === range
                                    ? 'bg-mars-accent text-white'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            {range} M
                        </button>
                    ))}
                </div>
            </div>

            {!hasData ? (
                <div className="flex h-[300px] items-center justify-center text-sm text-gray-500">
                    Keine Verbrauchsdaten für {selectedResource} vorhanden.
                </div>
            ) : (
                <div className="h-[300px] w-full" style={{ pointerEvents: 'none' }}>
                    <ResponsiveContainer width="100%" height="100%" >
                        <LineChart
                            data={chartData}
                            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                        >
                            <CartesianGrid
                                vertical={false}
                                strokeDasharray="3 3"
                                stroke="#4b5563"
                            />
                            <XAxis
                                dataKey="period"
                                tickFormatter={(period) =>
                                    formatPeriod(String(period), selectedRange)
                                }
                                minTickGap={20}
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9ca3af', fontSize: 12 }}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9ca3af', fontSize: 12 }}
                                width={60}
                            />
                            <Tooltip
                                labelFormatter={(period) =>
                                    formatPeriod(String(period), selectedRange)
                                }
                                contentStyle={{
                                    background: '#18181b',
                                    border: '1px solid #374151',
                                    borderRadius: 8,
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="amount"
                                name="Verbrauch"
                                unit={` ${selectedUnit}`}
                                stroke="var(--accent)"
                                strokeWidth={3}
                                dot={selectedRange === 1 ? false : { r: 3 }}
                                activeDot={{ r: 6 }}
                                animationDuration={700}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}

export function ResourceStockLevelChart({
    data,
    isLoading,
}: StockLevelChartProps) {
    if (isLoading) {
        return <GraphSkeleton />;
    }

    if (data.length === 0) {
        return (
            <div className="flex h-[350px] items-center justify-center text-sm text-gray-500">
                Keine Bestandsdaten vorhanden.
            </div>
        );
    }

    return (
        <div>
            <div className="h-[320px] w-full" style={{ pointerEvents: 'none' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 10, right: 35, left: 15, bottom: 0 }}
                    >
                        <CartesianGrid
                            horizontal={false}
                            strokeDasharray="3 3"
                            stroke="#4b5563"
                        />
                        <XAxis
                            type="number"
                            domain={[0, 'dataMax + 25']}
                            tickFormatter={(value) => `${value}%`}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                        />
                        <YAxis
                            type="category"
                            dataKey="resource"
                            width={90}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#d1d5db', fontSize: 12 }}
                        />
                        <Tooltip
                            contentStyle={{
                                background: '#18181b',
                                border: '1px solid #374151',
                                borderRadius: 8,
                            }}
                        />
                        <ReferenceLine
                            x={100}
                            stroke="#f97316"
                            strokeWidth={2}
                            strokeDasharray="6 4"
                        />
                        <Bar
                            dataKey="percentage"
                            name="Bestand"
                            unit="%"
                            radius={[0, 6, 6, 0]}
                            animationDuration={700}
                        >
                            {data.map((entry) => (
                                <Cell
                                    key={entry.resource}
                                    fill={getStockColor(entry.percentage)}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
                <span>
                    <span className="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-red-500" />
                    unter Mindestbestand
                </span>
                <span>
                    <span className="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-orange-500" />
                    knapp
                </span>
                <span>
                    <span className="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-green-500" />
                    ausreichend
                </span>
                <span className="text-orange-400">Linie: 100 % Mindestbestand</span>
            </div>
        </div>
    );
}
