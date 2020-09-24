import storage from './local.storage';

class UserSession {

    private static readonly LOGGED: string = "logged";
    private static readonly TOKEN: string = "token";

    public login(username: string, token: string): void {
        storage.setItem(UserSession.LOGGED, username);
        storage.setItem(UserSession.TOKEN, token);
    }

    public async getToken(): Promise<string> {
        return storage.getItem(UserSession.TOKEN);
    }

    public async getLoggedUser(): Promise<string> {
        return storage.getItem(UserSession.LOGGED);
    }

    public logout(): void {
        storage.removeItem(UserSession.LOGGED);
        storage.removeItem(UserSession.TOKEN);
    }

}

export default new UserSession();