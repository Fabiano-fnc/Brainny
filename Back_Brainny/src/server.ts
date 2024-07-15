import dotenv from 'dotenv';
import app from './app';
import sequelize from './config/sequelize';

dotenv.config();

const startServer = async () => {
  try {
    // Testar a conexão com o banco de dados antes de iniciar o servidor
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados bem-sucedida!');

    // Sincronizar os modelos com o banco de dados
    await sequelize.sync();

    const PORT = process.env.PORT || 5000; // Alterado para 5000
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (err) {
    console.error('Não foi possível conectar ao banco de dados:', err);
    process.exit(1); // Sair do processo com erro
  }
};

startServer();