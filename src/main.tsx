import React from 'react'; 
import ReactDOM from 'react-dom/client'
import { Home } from './components'; 
import './index.css'; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Home title = {"Ranger's Shop of Horrors"} />
  </React.StrictMode>,
)
