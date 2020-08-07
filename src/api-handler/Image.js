import api_settings from '../api-settings.json';
import axios from 'axios';

const cloudinary_endpoint = `${
    api_settings.url
}/api/image`;

export const ImageUpload = {
    uploadImage: async (body) => {
        const headers = {
            Accept: 'application/json'
        };

        return await axios.post(cloudinary_endpoint, body, {
            headers: headers
        });
    }
}