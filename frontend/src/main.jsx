import React from 'react'; // Ensure React is imported
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import AuthContext from './context/authContext.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContext>
      <App />
    </AuthContext>
  </React.StrictMode>
);
