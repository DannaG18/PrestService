import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App'; // Componente principal de la aplicación
import { BrowserRouter as Router } from 'react-router-dom'; // Para manejar las rutas

ReactDOM.createRoot(document.getElementById('root')!).render( 
  <React.StrictMode>
    <Router>
    <App />
    </Router>
  </React.StrictMode>
);