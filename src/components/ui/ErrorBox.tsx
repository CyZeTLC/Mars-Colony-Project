const ErrorBox = ({ error }: { error: string }) => {
    return (
        <div className="p-8 text-center bg-secondary backdrop-blur-md rounded-xl border border-white/5 italic font-light tracking-wide flex w-full justify-center place-items-center gap-4">
            <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
            </div>
            <p className="text-red-500">{error}</p>
        </div>
    );
};

export default ErrorBox;