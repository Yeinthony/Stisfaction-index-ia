import axios from 'axios';

const userApi = axios.create({
    baseURL: "http://localhost:8000/detections/expressions/"
})

export const getExpressionsForDay = (token, day, month, year) => userApi.get(
    `/?token=${token}&record=1&day=${day}&month=${month}&year=${year}`
).catch((err) => err.response);

export const getExpressionsForWeek = (token, week, year) => userApi.get(
    `/?token=${token}&record=2&week=${week}&year=${year}`
).catch((err) => err.response);

export const getExpressionsForMonth = (token, month, year) => userApi.get(
    `/?token=${token}&record=3&month=${month}&year=${year}`
).catch((err) => err.response);

export const getExpressionsForYear = (token, year) => userApi.get(
    `/?token=${token}&year=${year}`
).catch((err) => err.response);

export const createExpressions = (token, expressions) => userApi.post(`/?token=${token}`, expressions).catch((err) => err.response);
