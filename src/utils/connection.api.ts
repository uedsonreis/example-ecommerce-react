import { create, ApisauceInstance } from 'apisauce';
import { Item } from '../model/item';
import { User } from '../model/user';

const Authorization: string = "Authorization";

const headers = { Accept: 'application/json' };

class ServiceAPI {
    
    private readonly apiUsers: ApisauceInstance = create({
        // baseURL: "http://example-ecommerce.herokuapp.com/",
        baseURL: "http://127.0.0.1:3001/",
        headers,
    });

    private readonly apiProducts: ApisauceInstance = create({
        // baseURL: "http://example-ecommerce.herokuapp.com/",
        baseURL: "http://127.0.0.1:3002/",
        headers,
    });

    private readonly apiSales: ApisauceInstance = create({
        // baseURL: "http://example-ecommerce.herokuapp.com/",
        baseURL: "http://127.0.0.1:3003/",
        headers,
    });

    public async getProductList() {
        return await this.apiProducts.get('products');
    }

    public async login(user: User) {
        const { login, password } = user;
        return await this.apiUsers.post('users/login', { username: login, password });
    }

    public async addCustomer(body: any) {
        return await this.apiUsers.post('users/customers', body);
    }

    public async getSalesOrderList(token: string) {
        return await this.apiSales.get('sales/orders', {}, { headers: { Authorization: "Bearer "+ token } });
    }

    public async invoice(items: Item[], token: string) {
        return await this.apiSales.post('sales/orders', items, { headers: { Authorization: "Bearer "+ token } });
    }

}

export default new ServiceAPI();