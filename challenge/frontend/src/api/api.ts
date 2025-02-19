import axios from "axios";

const API_URL = "http://localhost:5000";

export const register = async (username: string, password: string) =>
  axios.post(`${API_URL}/auth/register`, { username, password });

export const login = async (username: string, password: string) =>
  axios.post(`${API_URL}/auth/login`, { username, password });

export const getTasks = async (token: string) =>
  axios.get(`${API_URL}/tasks`, { headers: { Authorization: `Bearer ${token}` } });

export const createTask = async (token: string, title: string, description: string) =>
  axios.post(`${API_URL}/tasks`, { title, description }, { headers: { Authorization: `Bearer ${token}` } });

export const updateTask = async (token: string, id: number, updates: object) =>
  axios.put(`${API_URL}/tasks/${id}`, updates, { headers: { Authorization: `Bearer ${token}` } });

export const deleteTask = async (token: string, id: number) =>
  axios.delete(`${API_URL}/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } });
