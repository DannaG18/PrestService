import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; 
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './api/securityservice/AuthenticationContext'; // Adjust this path to where AuthProvider is located

ReactDOM.createRoot(document.getElementById('root')!).render( 
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
