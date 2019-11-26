import api from '../utils/connection.api';
import storage from './local.storage';
import { User } from '../model/user';

class UserSession {

    private static readonly LOGGED: string = "logged";

    public login(user: User, callback: any): void {
        api.post('user/login', user).then((result: any) => {
            if (result.ok) {
                storage.setItem(UserSession.LOGGED, result.data);
                callback(true);
            } else {
                callback(false);
            }
        });
    }

    public logged(): string {
        return storage.getItem(UserSession.LOGGED);
    }

    public logout(): void {
        storage.removeItem(UserSession.LOGGED);
    }

}

export default new UserSession();