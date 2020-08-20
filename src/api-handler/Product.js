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
    },
    createProduct: async (data) => {
        return await axios.post(product_endpoint, data, {
            headers: {
                Accept: 'application/json'
            }
        });
    },
    getProductById: async (id) => {
        return await axios.get(`${product_endpoint}/${id}`, {
            headers: {
                Accept: 'application/json'
            }
        });
    },
    deleteProduct: async (id) => {
        return await axios.delete(`${product_endpoint}/${id}`, {
            headers: {
                Accept: 'application/json'
            }
        });
    }
};