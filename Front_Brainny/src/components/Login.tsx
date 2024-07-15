import React, { useState } from 'react';
import { Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getUserFromToken, fetchUsers, login } from '../services/authService';
import '../styles/Login.css';
import GrupoImg from "../images/grupo.png";
import PontoGo from "../images/ponto3.png";

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await login(email, password); 

      const userFromToken = getUserFromToken();
      const usersDB = await fetchUsers(); 
      
      usersDB?.forEach((user) => {
        if (user.id === userFromToken?.id) {
          if (user.role == 'Administrador') {
            navigate('/dashboard');
          } else if (user.role == 'Colaborador') {
            navigate('/dashboardcolaborador');
          }
        }
      });
    
    } catch (error) {
      console.error('Erro ao fazer login', error);
      setError('Credenciais inválidas');
    }
  };

  return (
    <div className="login-page">
      <div className="imageSection">
        <img className="grupo" src={GrupoImg} alt="Grupo" />
        <h1 className="welcomeText">Bem-vindo ao PontoGo</h1>
        <p className="subtitleText">Aqui você fará toda a gestão do seu sistema de pontos.</p>
      </div>
      <div className="formSection">
        <Container component="main" maxWidth="xs">
          <div className="logo">
            <img src={PontoGo} alt="PontoGo Logo" />
          </div>
          <h2 className='login'>Faça login</h2>
          {error && <p className="errorText">{error}</p>}
          <form className="form" noValidate onSubmit={handleLogin}>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <a href="#" className="customLink">Esqueci minha senha</a>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="submitButton"
            >
              Entrar
            </Button>
          </form>
        </Container>
      </div>
    </div>
  );
};

export default Login;
