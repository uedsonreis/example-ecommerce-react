import { create, ApisauceInstance } from 'apisauce';

const BASE_URL: string = "http://example-ecommerce.herokuapp.com/";
// const BASE_URL: string = "http://127.0.0.1:8080/";

export const Authorization: string = "Authorization";

const api: ApisauceInstance = create({
    baseURL: BASE_URL,
    headers: {
        Accept: 'application/json',
    },
});

export default api;