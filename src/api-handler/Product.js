import api_settings from '../api-settings.json';
import { UserSchema } from './schemas/UserSchema';
import axios from 'axios';

const product_endpoint = `${
    api_settings.url
}/api/products`;

export const Products = {
    getProduct: async () => {
        return await axios.get(product_endpoint, {
            headers: {
                Accept: 'application/json'
            }
        });
    }
};