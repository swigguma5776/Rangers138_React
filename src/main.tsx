import React from 'react'; 
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'; 
import { ThemeProvider } from '@mui/material/styles'; 
import { FirebaseAppProvider } from 'reactfire';
import 'firebase/auth';

// internal imports
import { Home, Cart, Shop, Auth } from './components'; 
import './index.css'; 
import { theme } from './Theme/themes'; 
import { firebaseConfig } from './firebaseConfig'; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig} >
      <ThemeProvider theme = { theme }>
        <Router>
          <Routes>
            {/* associating endpoints with components */}
            <Route path='/' element= {<Home title = {"Ranger's Shop of Horrors"} />} />
            <Route path='/auth' element= {<Auth title = {"Ranger's Shop of Horrors"} />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/cart' element={<Cart />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </FirebaseAppProvider>
  </React.StrictMode>
)
