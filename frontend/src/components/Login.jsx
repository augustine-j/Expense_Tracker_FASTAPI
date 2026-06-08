import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";
import React from 'react';
import LoginPage, { Username, Password, Submit, Title, Logo } from '@react-login-page/page1';
import LoginLogo from 'react-login-page/logo';

const styles = { height: 750};



function Login() {
   
    const [error, setError] = useState("");
    const [username,setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();


    async function handleSubmit(){
       
        

        try{
            const data = await login(username,password);
            localStorage.setItem("token",data.access_token);
            
            navigate("/dashboard");


        }
        catch (error) {
            setError("Invalid username or password");
        }
    }

    return(

      <div style={styles}>

        {error && <p>{error}</p>}

       <LoginPage>
        <Username 
        name="username"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        />

        <Password 
        name="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <Submit onClick={handleSubmit}>Login</Submit>
        <Title>Expense Tracker</Title>
        <Logo>
            <LoginLogo />
        </Logo>
       </LoginPage>
      </div>
        

    );
}

export default Login;