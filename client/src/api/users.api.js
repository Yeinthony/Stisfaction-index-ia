import axios from 'axios';

const userApi = axios.create({
    baseURL: "http://localhost:8000/usuario/usuario/"
})

export const getAllUsers = () => userApi.get("/");

export const createUser = (user) => userApi.post("/", user);
