import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { sessionContext , checkCookies} from './models/session';
import NavBar from './components/NavBar';
import { BrowserRouter, Routes , Route} from 'react-router';

import NoPage from './pages/NoPage';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';

function App() {
  const [session, setSession] = useState(undefined);
  checkCookies(setSession)
  
  return (
    <div className="App">
    <sessionContext.Provider value={{ session, setSession }}>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/" element={< Home/>}/>
          <Route path="login" element={< Login/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="*" element = {< NoPage/>}/>
        </Routes>
      </BrowserRouter>
    </sessionContext.Provider>
    </div>
  );
}

export default App;
