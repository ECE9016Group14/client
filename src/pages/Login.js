import { Navigate } from "react-router";

import { login, ActiveUserContext } from "../models/activeUser";
import { useContext } from "react";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import './Login/Login.css'
import Button from 'react-bootstrap/Button';
import { Link, NavLink } from 'react-router';



function Login() {
  const { activeUser, setActiveUser } = useContext(ActiveUserContext);
  if (activeUser) {
    //Redirect if logged in
    return <Navigate replace to="/"/>
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    let email = event.target.email.value;
    let password = event.target.password.value;
    console.log(`Email:${email}, Pass:${password}`)

    let result = await login(email,password);
    if (!result){
      alert("Username or Password Incorrect")
    }else{
      setActiveUser(await result)
    }
  };

  return (
    <div className="loginArea">
      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatingInput" label="Email address" className="mt-5">
          <Form.Control type="email" placeholder="name@example.com" name="email"/>
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password" className="mt-5">
          <Form.Control type="password" placeholder="Password" name="password" />
        </FloatingLabel>
        <Button type="submit" className="mt-5">Login</Button>
      </Form>
      <NavLink to="/register" className="mt-5" end>Register</NavLink>
    </div>
  );
}
  
  export default Login;