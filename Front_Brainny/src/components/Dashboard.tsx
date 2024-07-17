import React, { useEffect, useState } from 'react';
import '../styles/Dashboard.css';
import { instance, API_URL } from "../axiosConfig";
import { useNavigate } from "react-router-dom";
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

  const handleLogout = async () => {
    const user_id = getUserFromToken()?.id;
    if (user_id) logout(user_id);
    navigate('/login');
  };

  const fetchRegisters = async (page: number) => {
    try {
      const responseRegister = await instance.get(`${API_URL}/api/registers`, {
        params: {
          page,
          limit: recordsPerPage
        }
      });
      const responseUsers = await instance.get(`${API_URL}/api/usuarios`);

      const dataRegisters: RegisterResponse[] = responseRegister.data.rows;
      const totalRecords: number = responseRegister.data.count;
      const dataUsers: UsersResponse[] = responseUsers.data;

      const mappedData = dataRegisters.map(register => ({
        id: register.id,
        user_id: register.user_id,
        name: dataUsers.find(user => user.id === register.user_id)?.name || '-',
        date: new Date(register.registered_time).toLocaleDateString('pt-BR'),
        time: new Date(register.registered_time).toTimeString().split(' ')[0]
      }));

      const sortedData = mappedData.sort((a, b) => {
        const dateA = new Date(`${a.date} ${a.time}`).getTime();
        const dateB = new Date(`${b.date} ${b.time}`).getTime();
        return dateB - dateA;
      });

      setTimeRecords(sortedData);
      setTotalPages(Math.ceil(totalRecords / recordsPerPage));
    } catch (error) {
      console.error('Erro ao carregar os registros de tempo:', error);
    }
  };

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
        <h1>Dashboard</h1>
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
