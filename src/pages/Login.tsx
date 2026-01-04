const LoginPage = () => {
    return (
        <section className="min-h-screen flex items-center justify-center bg-bg-dark">
            <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-8 w-full max-w-md backdrop-blur-sm">
                <div className="flex flex-col items-center">
                    <img src="./logo.png" alt="ALS-Control Logo" className="w-16 h-16 mb-4" />
                    <h2 className="text-2xl font-bold mb-6 text-center text-mars-accent">ALS LOGIN</h2>
                </div>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium mb-1">Benutzername</label>
                    <input type="text" id="username" className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-mars-accent" />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium mb-1">Passwort</label>
                    <input type="password" id="password" className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-mars-accent" />
                </div>
                <div id="error-msg" className="text-red-400 text-sm mb-4 hidden"></div>
                <button id="login-btn" className="w-full bg-mars-accent hover:bg-mars-accent-dark text-white font-semibold py-2 px-4 rounded transition-colors">Anmelden</button>
            </div>
        </section>
    );
}

export default LoginPage;