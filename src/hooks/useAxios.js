import { useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { API_BASE } from "../constant/api";

const url = API_BASE;

export default function useAxios() {
  const [auth] = useContext(AuthContext);

  const apiClient = axios.create({
    baseURL: url,
  });

  apiClient.interceptors.request.use(function (config) {
    config.headers.Authorization = auth ? `Bearer ${auth.accessToken}` : "";
    return config;
  });

  return apiClient;
}
