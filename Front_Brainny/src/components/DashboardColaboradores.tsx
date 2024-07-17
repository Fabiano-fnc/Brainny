import React, { useEffect, useState } from 'react';
import '../styles/DashboardColaborador.css';
import { useNavigate } from "react-router-dom";
import { instance, API_URL } from "../axiosConfig";
import { getUserFromToken, logout } from "../services/authService";

interface RegisterResponse {
  id: number;
  user_id: number;
  registered_time: string;
}

interface Registers {
  id: number;
  user_id: number;
  name: string;
  date: string;
  time: string;
}

interface UsersResponse {
  id: number;
  name: string;
  email: string;
  senha: string;
  tipo: string;
}

const Dashboard: React.FC = () => {
  const [timeRecords, setTimeRecords] = useState<Registers[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const recordsPerPage = 10; 
  const navigate = useNavigate();

  const handleLogout = async (event: React.FormEvent) => {
    const user_id = getUserFromToken()?.id;
    if (user_id) logout(user_id);
    navigate('/login');
  };

  const handleCreateRegister = async () => {
    try {
      const user = getUserFromToken();
      const user_id = user?.id || -1;
      const userName = user?.username || '-';
      const registered_time = new Date().toISOString();
      const response = await instance.post(`${API_URL}/api/registers`, { user_id, registered_time });
      const registResponse: RegisterResponse = response.data;

      const date = new Date(registered_time).toLocaleDateString('pt-BR');
      const time = new Date(registered_time).toTimeString().split(' ')[0];

      const newRegister: Registers = {
        id: registResponse.id,
        user_id,
        name: userName,
        date, time
      };

      const updatedRecords = [newRegister, ...timeRecords];
      setTimeRecords(updatedRecords);

      if (updatedRecords.length > recordsPerPage) {
        setCurrentPage(currentPage + 1);
      }
    } catch (error) {
      console.error('Erro ao inserir registro: ', error);
    }
  };

  const fetchRegisters = async (page: number) => {
    try {
      const userId = getUserFromToken()?.id;
      const responseRegister = await instance.get(`${API_URL}/api/registers`, {
        params: {
          page,
          limit: recordsPerPage,
          user_id: userId,
        }
      });
      const responseUsers = await instance.get(`${API_URL}/api/usuarios`);

      const dataRegisters: RegisterResponse[] = responseRegister.data.rows;
      const dataUsers: UsersResponse[] = responseUsers.data;

      const totalRecords = responseRegister.data.count; 

      const mappedData = dataRegisters.map(register => ({
        id: register.id,
        user_id: register.user_id,
        name: dataUsers.find(user => user.id === register.user_id)?.name || '-',
        date: new Date(register.registered_time).toLocaleDateString('pt-BR'),
        time: new Date(register.registered_time).toTimeString().split(' ')[0]
      }));

      setTimeRecords(mappedData);
      
      setTotalPages(Math.ceil(totalRecords / recordsPerPage));
    } catch (error) {
      console.error('Erro ao carregar os registros de tempo:', error);
    }
  };

  useEffect(() => {
    fetchRegisters(currentPage);
  }, []);

  useEffect(() => {
    fetchRegisters(currentPage);
  }, [currentPage]);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="logo">
          <h2 className='go'>PontoGo</h2>
        </div>
        <nav className="nav">
          <ul>
            <li><a href="#">Dashboard</a></li>
          </ul>
        </nav>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>

      <div className="content">
      <button onClick={handleCreateRegister} className="register-button"><h1>Registrar Ponto</h1></button>        
        <div className="table-container">
          <div className="table-header">
            <div className="table-cell">ID</div>
            <div className="table-cell">Colaborador</div>
            <div className="table-cell">Data</div>
            <div className="table-cell">Hora</div>
          </div>
          {timeRecords.map(record => (
            <div className="table-row" key={record.id}>
              <div className="table-cell">{record.user_id}</div>
              <div className="table-cell">{record.name}</div>
              <div className="table-cell">{record.date}</div>
              <div className="table-cell">{record.time}</div>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>&laquo; Anterior</button>
          <span>Página {currentPage} de {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>Próximo &raquo;</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;