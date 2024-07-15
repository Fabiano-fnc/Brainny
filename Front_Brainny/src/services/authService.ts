import {instance, API_URL} from '../axiosConfig';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface LoginResponse {
  token: string;
}

interface JwtPayload {
  id: number;
  username: string;
  exp: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  senha: string;
  role: string;
}

export const fetchUsers = async () => {
  try {
    const response = await instance.get<User[]>(`${API_URL}/api/usuarios`);
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar usuários: ', error);
  }
};

export const login = async (email: string, senha: string) => {
  try {
    const response = await axios.post<LoginResponse>(`${API_URL}/auth/login`, { email, senha });
    const { token } = response.data;

    // Armazena o token no localStorage
    localStorage.setItem('token', token);

    return token;
  } catch (error) {
    console.error('Erro ao fazer login: ', error);
    throw error;
  }
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const logout = (user_id: number) => {
  const token = getToken();
  if (token) localStorage.removeItem('token');
};

export const getUserFromToken = () => {
  const token = getToken();
  if (token) {
    try {
      return jwtDecode<JwtPayload>(token);
    } catch (error) {
      console.error('Erro ao decodificar o token', error);
      return null;
    }
  }
  return null;
};
