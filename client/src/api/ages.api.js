import axios from 'axios';

const userApi = axios.create({
    baseURL: "http://localhost:8000/detections/ages/"
})

export const getAgesForDay = (token, day, month, year) => userApi.get(
    `/?token=${token}&record=1&day=${day}&month=${month}&year=${year}`
).catch((err) => err.response);

export const getAgesForWeek = (token, week, year) => userApi.get(
    `/?token=${token}&record=2&week=${week}&year=${year}`
).catch((err) => err.response);

export const getAgesForMonth = (token, month, year) => userApi.get(
    `/?token=${token}&record=3&month=${month}&year=${year}`
).catch((err) => err.response);

export const getAgesForYear = (token, year) => userApi.get(
    `/?token=${token}&year=${year}`
).catch((err) => err.response);

export const createAges = (token, genders) => userApi.post(`/?token=${token}`, genders).catch((err) => err.response);
