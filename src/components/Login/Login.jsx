import { useDispatch} from "react-redux";
import {login as authLogin} from "../../features/authSlice";
import { Link,useNavigate } from "react-router-dom";

import Input from "../Headers/Input";
import authService from "../../appwrite/auth"

import { useState } from "react";
import Button from "../Headers/Button";
import { useForm } from "react-hook-form";




const Login = () => {
  const dispatch=useDispatch();
  const nav=useNavigate();
  const {register,handleSubmit}=useForm();
  const [error,setError]=useState("");

  const login =async(data)=>{
    setError("");
    try {
      const session=await authService.login(data)
      
      if(session){
        const userData=await authService.getAccount();
        if(userData){
          dispatch(authLogin(userData))
          nav("/")
        }
      }
    } catch (error) {
      setError(error.message)
    }
    
  }

  return (
    <div className="flex items-center justify-center p-4">
       <div className={`mx-auto w-full max-w-lg bg-gray-300 rounded-xl p-8 border border-black/15`}>
        <h2 className="text-center text-2xl font-semibold leading-tight">Login to your Account</h2>
      <form onSubmit={handleSubmit(login)} className="mt-4">
        <div className="space-y-5">
          <Input
          label="Email:"
          type="email"
          placeholder="Enter Your Email"
          {...register("email",{
            required:true,
            validate:{
              matchPattern:(value)=>/^\w+([.-]?\w+)*@\w([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be valid.",
            }
          })}
          />
          <Input
          label="Password:"
          type="password"
          placeholder="Enter Your Password"
          {...register("password",{
            required:true
          })}
          />
          <Button type="submit" className="w-full">Login</Button>
        </div>
        </form>
        <p className="mt-2 text-center text-black">Dont have an Account?<Link to="/signup" className="font-medium text-pretty hover:underline duration-200 transition-all text-blue-700 ml-2">Signup</Link></p>
        {error && <p className="text-red-600 text-center">{error}</p>}
      </div>
      
      
      
    </div>
  )
}
export default Login