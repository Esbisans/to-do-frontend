import axios from "axios";
import { getEnv } from "../helpers/getEnv";

const { VITE_API_URL } = getEnv();

const taskApi = axios.create({
    baseURL: VITE_API_URL,
});

export default taskApi;