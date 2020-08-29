import api_settings from '../api-settings.json';
import { UserSchema } from './schemas/UserSchema';
import axios from 'axios';

const product_endpoint = `${
    api_settings.url
}/api/products`;

export const Products = {
    getProduct: async (token) => {
        return await axios.get(product_endpoint, {
            headers: {
                'x-access-token': token,
                Accept: 'application/json'
            }
        });
    },
    createProduct: async (data, token) => {
        return await axios.post(product_endpoint, data, {
            headers: {
                'x-access-token': token,
                Accept: 'application/json'
            }
        });
    },
    getProductById: async (id, token) => {
        return await axios.get(`${product_endpoint}/${id}`, {
            headers: {
                'x-access-token': token,
                Accept: 'application/json'
            }
        });
    },
    deleteProduct: async (id, token) => {
        return await axios.delete(`${product_endpoint}/${id}`, {
            headers: {
                'x-access-token': token,
                Accept: 'application/json'
            }
        });
    },
    updateProduct: async (id, data, token) => {
        return await axios.put(`${product_endpoint}/${id}`, data, {
            headers: {
                'x-access-token': token,
                Accept: 'application/json'
            }
        })
    }
};