export const GraphSkeleton = () => (
  <div
    style={{ backgroundColor: 'var(--secondary)' }}
    className="animate-pulse rounded-lg w-full h-[300px] flex items-end p-4 gap-2"
  >
    <div
      style={{ backgroundColor: 'var(--bg)', opacity: 0.7 }}
      className="w-1/4 h-1/2 rounded"
    ></div>
    <div
      style={{ backgroundColor: 'var(--bg)', opacity: 0.7 }}
      className="w-1/4 h-3/4 rounded"
    ></div>
    <div
      style={{ backgroundColor: 'var(--bg)', opacity: 0.7 }}
      className="w-1/4 h-2/3 rounded"
    ></div>
    <div
      style={{ backgroundColor: 'var(--bg)', opacity: 0.7 }}
      className="w-1/4 h-full rounded"
    ></div>
  </div>
);