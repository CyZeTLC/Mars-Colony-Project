const StatusCard = ({ title, value, color, borderColor }: any) => (
    <div className={`bg-card-bg p-4 rounded-lg border ${borderColor} shadow-md`}>
        <p className="text-sm text-gray-400">{title}</p>
        <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
);

export default StatusCard;