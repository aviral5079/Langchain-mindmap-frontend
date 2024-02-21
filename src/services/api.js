import axios from "axios";
import { BASE_URL } from "../constants/baseURL";

// Function to make a GET request
export const get = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`, { params });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to make a POST request
export const post = async (endpoint, data, params = {}) => {
  try {
    const response = await axios.post(`${BASE_URL}/${endpoint}`, data, {
      params,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to make a PUT request
export const put = async (endpoint, data, params = {}) => {
  try {
    const response = await axios.put(`${BASE_URL}/${endpoint}`, data, {
      params,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to make a DELETE request
export const del = async (endpoint, params = {}) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${endpoint}`, { params });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
