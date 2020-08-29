import api_settings from '../api-settings.json';
import axios from 'axios';

const sale_endpoint = `${
    api_settings.url
}/api/sales`;

export const Sale = {
    saleProduct: async (data) => {
        return axios.post(sale_endpoint, data,  {})
    }
}