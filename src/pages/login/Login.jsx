import axios from 'axios';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext copy';
import './login.scss'
import {useNavigate} from 'react-router-dom'
function Login() {
    const[credentials,setcredential]=useState({
        username:undefined,
        password:undefined
    })
const navigate=useNavigate()
    const {user,loading,error,dispatch}=useContext(AuthContext);
    const handlechange=(e)=>{
        setcredential(prev=>({...prev,[e.target.id]:e.target.value}))
    }
    const handlelogin=async e =>{
        e.preventDefault();
        dispatch({type:"LOGIN_START"})
        try {
            const res =await axios.post("https://booking-backend-6nn8.onrender.com/auth/login",credentials)
            console.log(res)
           
            if(res.data.isAdmin){
              dispatch({type:"LOGIN_SUCCESS",payload:res.data})
                navigate("/")
            }else{
              dispatch({type:"LOGIN_FAIL",payload:{message:"you are not admin"}})
        } }catch (error) {
            console.log("jsdsbd")
            console.log(error)
            dispatch({type:"LOGIN_FAIL",payload:error.response.data})
        }
    }
    
  return (
    <div className='login'>
    <div className='lContainer'>
    <input type="text" placeholder="username" id='username' className='lInput' onChange={handlechange}></input>
    <input type="password" placeholder="password" id='password' className='lInput' onChange={handlechange}></input>
    <button className='lButton' disabled={loading} onClick={handlelogin}>login</button>
{error && <span>{error.message}</span>}
    </div>
    </div>
  )
}

export default Login

//these made after backend