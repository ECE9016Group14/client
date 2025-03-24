import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


import { Link, NavLink } from 'react-router';


import { logout, sessionContext } from "../models/session";
import { useContext } from "react";

import { useNavigate } from "react-router";

function LoginComponent(){
  const { session, setSession } = useContext(sessionContext);

  let logoutHandler = () =>{
    logout(setSession, session)
  }

  if (session){
    let user_name = session.displayName
    let greeting = `Hello ${user_name}`
    let myLink = `/u/${session.userID}`
    return(
      <div>
        <Link to="/new">
        New Post
        </Link>
        <NavDropdown title={greeting} id="basic-nav-dropdown">
          <NavDropdown.Item>
            <NavLink to={myLink}>Preferences</NavLink>
          </NavDropdown.Item>
          <NavDropdown.Item onClick={logoutHandler}>
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      </div>
    )
  }else{
    return(
      <NavLink to="/login" end>
        Login or Register
      </NavLink>
    )
  }
}


function NavBar() {
  let navigate = useNavigate();

  return (
    <Navbar expand="lg" className="bg-body-tertiary justify-content-betweens">
    <Container>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav flex-grow-1">
        <Nav className="d-flex flex-grow-1 bar">
          <Link to="/"><Navbar.Brand >Software Engineer's Super Blog</Navbar.Brand></Link>
          <div className='flex-grow-1'/>
          <LoginComponent/>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default NavBar;