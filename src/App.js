import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { ActiveUserContext } from './models/activeUser';
import NavBar from './NavBar/NavBar';
import { BrowserRouter, Routes , Route} from 'react-router';

import Home from './pages/Home'

function App() {
  const [activeUser, setActiveUser] = useState(null);

  return (
    <div className="App">
    <ActiveUserContext.Provider value={{ activeUser: activeUser, setActiveUser: setActiveUser }}>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/" element={< Home/>}/>
        </Routes>
      </BrowserRouter>
    </ActiveUserContext.Provider>
    </div>
  );
}

export default App;
