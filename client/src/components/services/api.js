import axios from "axios";

const API_URL = "http://localhost:9000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add Authorization header
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      config.headers["Authorization"] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API methods
export const login = (email, password) =>
  api.post("/auth/login", { email, password }).then((res) => res.data);

export const register = (username, email, password) =>
  api
    .post("/auth/register", { username, email, password })
    .then((res) => res.data);

export const logout = () => {
  localStorage.removeItem("user");
  api.defaults.headers.common["Authorization"] = "";
};

export const getTasks = () => api.get("/task").then((res) => res.data);

export const createTask = (task) =>
  api.post("/task", task).then((res) => res.data);

export const getTaskById = (id) =>
  api.get(`/task/${id}`).then((res) => res.data);

export const updateTask = (id, task) =>
  api.put(`/task/${id}`, task).then((res) => res.data);
export const deleteTask = (id) =>
  api.delete(`/task/${id}`).then((res) => res.data);

export default api;
