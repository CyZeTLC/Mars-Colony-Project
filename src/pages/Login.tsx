import { AuthService } from "@/utils/AuthService";

export default function LoginPage({ onLogin }: { onLogin: () => void }) {
    const auth = new AuthService('https://hsbi.cyzetlc.de/dev/api/login.php');

    const handleLogin = async () => {
        await auth.login();

        if (AuthService.isLoggedIn()) {
            onLogin();
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-main" >
            <img src="https://media.cnn.com/api/v1/images/stellar/prod/230614113409-curiosity-marker-band-valley.jpg?q=w_3000,c_fill" alt="Mars Landscape" className="min-h-screen w-full absolute inset-0 object-cover blur" />
            <div className="opacity-35 bg-bg-main min-w-screen min-h-screen absolute inset-0 object-cover z-10"></div>
            <div className="bg-secondary border border-slate-700 rounded-xl p-8 w-full max-w-md backdrop-blur-sm shadow-smoke-lg relative z-20">
                <div className="flex flex-col items-center mb-6">
                    <img src="./logo.png" alt="ALS-Control Logo" className="w-16 h-16 mb-4" />
                    <h2 className="text-2xl font-bold text-center text-mars-accent">ALS LOGIN</h2>
                    <p className="text-sm text-center text-slate-300">Anmelden bei AresLS-Dashboard</p>
                </div>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium mb-1 ">Benutzername</label>
                    <input type="text" id="username" className="w-full bg-primary p-2 outline-none rounded-md border-l-2 border-l-mars-accent text-white focus:outline-none focus:ring-2 focus:ring-mars-accent" />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium mb-1">Passwort</label>
                    <input type="password" id="password" className="w-full bg-primary p-2 outline-none rounded-md border-l-2 border-l-mars-accent text-white focus:outline-none focus:ring-2 focus:ring-mars-accent" />
                </div>
                <div id="error-msg" className="text-red-400 text-sm mb-4 hidden"></div>
                <button id="login-btn" onClick={handleLogin} className="w-full bg-mars-accent hover:bg-mars-accent-dark text-white font-semibold py-2 px-4 rounded transition-colors">Anmelden</button>
            </div>
        </section>
    );
}