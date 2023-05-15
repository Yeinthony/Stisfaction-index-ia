import axios from 'axios';

const userApi = axios.create({
    baseURL: "http://localhost:8000/"
})

export const getAllUsers = () => userApi.get("/usuario/usuario/");

export const createUser = (user) => userApi.post("/usuario/usuario/", user).catch((err) => err.response);

export const loginUser = (user) => userApi.post("/login/", user).catch((err) => err.response);

export const logoutUser = (token) => userApi.get(`/logout/?token=${token}`);
