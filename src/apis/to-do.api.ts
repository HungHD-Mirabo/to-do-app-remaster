import axios from "axios";

const API_URL = 'localhost:8080/to-do';

export const fetchItems = (query: any) => {
    return axios.get(API_URL, {params: query});
}

export const addItem = (data: any) => {
    return axios.post(API_URL, data);
}

export const clearCompleted = () => {
    return axios.get(`${API_URL}/clear`);
}

export const updateItem = (id: number, data: any) => {
    return axios.put(`${API_URL}/${id}`, data);
}

export const completeItem = (id: number) => {
    return axios.put(`${API_URL}/complete/${id}`);
}