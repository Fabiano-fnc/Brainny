import React from 'react';
import '../styles/LandingPages.css';
import PontoImg from '../images/ponto2.png'
import LinkeLogo from '../images/linkedin.png'
import InstaLogo from '../images/insta.png'
import Facelogo from '../images/face.png'
import Brainny from '../images/brainny.png'
import AmoPet from '../images/amopet.png'
import Bus from '../images/bus.png'
import Study from '../images/study.png'
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="logo">
          <img src={PontoImg} alt='PontoGo Logo' />
        </div>
        <nav className="landing-nav">
          <a href="#home">Início</a>
          <a href="#about">Sobre</a>
          <Link to="/login" className="login-button">Faça Login</Link>
        </nav>
      </header>

      <main className="landing-main">
        <section className="hero">
          <h1>Chegou a nova realidade para Controle de Pontos</h1>
          <p>Com o PontoGo seus colaboradores poderão bater ponto de qualquer lugar, a qualquer hora, com segurança usando uma biometria intuitiva.</p>
          <div className="hero-buttons">
            <button className="start-button">Comece Agora</button>
            <button className="learn-more-button">Ver Planos</button>
          </div>
        </section>

        <section className="partners">
          <img src={Brainny} alt="Brainny" />
          <img src={AmoPet} alt="AmoPet" />
          <img src={Bus} alt="Bus" />
          <img src={Study} alt="GoStudy" /> 
        </section>
        
        <section className="plans">
          <h2>Encontre o plano perfeito</h2>
          <p>Escolha o plano que melhor atende à sua empresa e faça seus colaboradores mais felizes.</p>
          <div className="plan-boxes">
            <div className="plan-box">
              <h3>Plano Básico</h3>
              <p>R$ 30</p>
              <p>Ideal para pequenas equipes.</p>
            </div>
            <div className="plan-box">
              <h3>Plano Pro</h3>
              <p>R$ 50</p>
              <p>Perfeito para equipes médias.</p>
            </div>
            <div className="plan-box">
              <h3>Plano Empresarial</h3>
              <p>R$ 100</p>
              <p>Para grandes corporações.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="social-media">
          <a href="https://www.instagram.com"><img src={InstaLogo} alt="Instagram" /></a>
          <a href="https://www.facebook.com"><img src={Facelogo} alt="Facebook" /></a>
          <a href="https://www.linkedin.com"><img src={LinkeLogo} alt="LinkedIn" /></a>
        </div>
        <p>&copy; 2024 PontoGo. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
