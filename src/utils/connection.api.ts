import { create, ApisauceInstance } from 'apisauce';

const BASE_URL: string = "http://example-ecommerce.herokuapp.com/";

const api: ApisauceInstance = create({
    baseURL: BASE_URL,
    headers: { Accept: 'application/json' },
});

export default api;