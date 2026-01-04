export class AuthService {
    constructor(private loginUrl: string) {}

    public async login(): Promise<void> {
        const userField = document.getElementById('username') as HTMLInputElement;
        const passField = document.getElementById('password') as HTMLInputElement;
        const errorMsg = document.getElementById('error-msg');
        
        try {
            const response = await fetch(this.loginUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: userField.value,
                    password: passField.value
                })
            });

            const result = await response.json();

            if (result.success) {
                localStorage.setItem('auth_token', result.token);
                localStorage.setItem('username', userField.value);
                localStorage.setItem('csrf_token', result.csrf);
                window.location.reload(); 
            } else {
                if (errorMsg) {
                    errorMsg.textContent = "Login fehlgeschlagen!";
                    errorMsg.classList.remove('hidden');
                }
            }
        } catch (error) {
            console.error("Login-Fehler:", error);
        }
    }

    public static logout(): void {
        localStorage.removeItem('auth_token');
        window.location.reload();
    }

    public static isLoggedIn(): boolean {
        return !!localStorage.getItem('auth_token');
    }
}