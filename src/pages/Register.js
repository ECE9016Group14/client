import { register, ActiveUserContext } from "../models/activeUser";
import { useContext } from "react";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import './Login/Login.css'
import Button from 'react-bootstrap/Button';
import { Link, NavLink ,useNavigate, Navigate} from 'react-router';

import './Register/Register.css'


function Register() {
  const { activeUser, setActiveUser } = useContext(ActiveUserContext);
  let navigate = useNavigate();
  if (activeUser) {
    //Redirect if logged in
    return <Navigate replace to="/"/>
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    let email = event.target.email.value;
    let password = event.target.password.value;
    let name = event.target.name.value;
    console.log(`Email:${email}, Pass:${password}, Name:${name}`)

    let result = await register(name,email,password);
    if(result){
      alert("Registration Successful \n Returning to Login")
      navigate("/login")
    }else{
      alert(result);
    }
  };

  return (
    <div className="registerArea">
      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatingInput" label="Display Name" className="mt-5">
          <Form.Control type="text" placeholder="" name="name"/>
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="Email address" className="mt-5">
          <Form.Control type="email" placeholder="name@example.com" name="email"/>
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password" className="mt-5">
          <Form.Control type="password" placeholder="Password" name="password" />
        </FloatingLabel>
        <Button type="submit" className="mt-5">Register</Button>
      </Form>
    </div>
  );
}
  
  export default Register;