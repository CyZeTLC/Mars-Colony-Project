const LoginPage = () => {
    return (
        <div id="login-container" className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
            <h2 className="text-2xl mb-4">Login</h2>
            <input type="text" id="username" placeholder="Benutzername" className="w-full p-2 mb-2 border" />
            <input type="password" id="password" placeholder="Passwort" className="w-full p-2 mb-4 border" />
            <button id="login-btn" className="w-full bg-blue-500 text-white p-2 rounded">Anmelden</button>
            <p id="error-msg" className="text-red-500 mt-2 hidden"></p>
        </div>
    );
}

export default LoginPage;