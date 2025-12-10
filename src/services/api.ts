import axios from "axios";

const API_URL = 'https://jsonplaceholder.typicode.com';

export const restAPI = async <T>(url: string, method: string, body: any): Promise<T> => {
    try {
        const response = await axios.request({
            url: API_URL + url,
            method: method,
            data: body,
        });
        return response.data as T;
    } catch (error) {
        console.error('Error calling API:', error);
        throw error;
    } 
}