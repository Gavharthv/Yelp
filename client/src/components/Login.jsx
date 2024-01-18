import React, { useState } from "react";
import "./Login.css";
import { gql, useMutation } from "@apollo/client";
// import { Link } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import { Home } from "./Home";
const LOGIN_USER = gql`
  mutation login($email:String!,$password:String!) {
    login(data: {email:$email , password:$password }) {
      success
      token
      message
        data{
            id
            name
            email
        }
    }
  }
`;
export const Login = () => {
  const navigate = useNavigate()
  const [emailUser,setEmail] = useState("")
  const [passwordUSer,setPassword] = useState("")
  const [loginMutation, {loading,error}] = useMutation(LOGIN_USER, {
  }) 
  function handleLog() {
    loginMutation({
        variables:{
            email:emailUser,
            password:passwordUSer
        }
    }).then((data) => {
        const succes = data.data.login.success
        const message = data.data.login.message
        const dataUser = data.data.login.data.id
        // props = dataUser
        if(!succes){
            alert(message);
            navigate('/login')
            return false
        }else{
            alert(message);
            console.log(dataUser);
            navigate(`/home/${dataUser}`)
            return true
        }
    }).catch((error) => {
        console.log(error);
    })
  }
  return (
  
    <div className="login_wrape">
      <h1>Login</h1>
      <form onSubmit={handleLog}>
        <input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
      </form>
      <button className="btn" onClick={handleLog}>
        Login
      </button>
      <p>Doy you not have account? <Link to={'/login'}>Register</Link></p>
    </div>
  );
};
