import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import AppContext from './context/context.jsx';
import { SocketContextProvider } from './context/SocketContext.jsx';
import { BrowserRouter } from 'react-router-dom';

import '@coreui/coreui/dist/css/coreui.min.css';
import '../src/CSS/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppContext>
      <SocketContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SocketContextProvider>
    </AppContext>
  </React.StrictMode>
);
