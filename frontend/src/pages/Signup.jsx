import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../api";
import React from "react";
import LoginPage,{ Username, Password, Submit, Title, Logo } from '@react-login-page/page1';
import LoginLogo from 'react-login-page/logo';

const styles = { height: 750};

function SignUp(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [message,setMessage] = useState("");
    

    const navigate = useNavigate();

    async function handleSignup(){

        try{
           const data =  await signUp(username,password);
           console.log(data);
            setMessage(data.message);
            setTimeout(() =>{
                navigate("/login"); 
            }, 2000);
            
            

        }
        catch (error){
            console.error("Signup error:", error);
            setMessage("Signup failed,try again!")
        }
    }

    return(
         <div style={styles}>

        {message && <p>{message}</p>}

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
        <Submit onClick={handleSignup}>Create Account</Submit>
        <Title>Expense Tracker</Title>
        <Logo>
            <LoginLogo />
        </Logo>
       </LoginPage>
      </div>
        

    );
    
}

export default SignUp;