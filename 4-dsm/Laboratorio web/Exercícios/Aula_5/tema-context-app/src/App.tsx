import React from 'react';
import { useTheme } from './context/ThemeContext';
import './App.css'; // Importe o arquivo CSS aqui

function App() {
  const { tema, alternarTema } = useTheme();

  return (
    // O atributo data-theme é o que faz a mágica acontecer junto com o CSS
    <div className="app-container" data-theme={tema}>
      <h1 className="app-title">
        Aplicação com Tema {tema === 'claro' ? 'Claro ☀️' : 'Escuro 🌙'}
      </h1>
      
      <button className="theme-button" onClick={alternarTema}>
        Alternar Tema
      </button>
    </div>
  );
}

export default App;