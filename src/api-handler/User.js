import api_settings from '../api-settings.json';
import { UserSchema } from './schemas/UserSchema';
import axios from 'axios';

const user_endpoints = `${
    api_settings.url
}/api/user`;

const auth_endpoint = `${
    api_settings.url
}/api/auth`

export const Users = {
    register: async (body) => {
        const validate = UserSchema.validate(body);

        const headers = {
            Accept: 'application/json'
        }
        return await axios.post(`${auth_endpoint}/signup`, body, {
            headers: headers
        });
    },
    login: async (body) => {
        const headers = {
            Accept: 'application/json'
        };
        return await axios.post(`${auth_endpoint}/signin`, body, {
            headers
        });
    },
    getUserById: async (id, token) => {

        return await axios.get(`${user_endpoints}/${id}`, {
            headers: {
                'x-access-token': token,
                Accept: 'application/json'
            }
        });
    }
}