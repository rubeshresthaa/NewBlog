import authService from "../../appwrite/auth";
import {Input} from "../Headers/Input";
import {Button} from "../Headers/Button"
import { useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { login } from "../../features/authSlice";
import { useForm } from "react-hook-form";
import { useState } from "react";


const SignUp = () => {
  const dispatch=useDispatch()
  const {register,handleSubmit}=useForm();
  const [error,setError]=useState("")
  const nav=useNavigate()

  const signUp=async(data)=>{
    setError("");
    try {
      const createAccount=await authService.createAccount(data);
      if(createAccount){
        if(createAccount){
          const userData=await authService.getAccount()
          if(userData) dispatch(login(createAccount))
            nav("/")
        }

      }
    } catch (error) {
      setError(error.message)
    }

  }
  return (
    <div className="flex items-center justify-center">
      <div className={`mx-auto w-full max-w-lg bg-gray-300 rounded-xl p-8 border border-black/15`}>
      <h2 className="text-center font-medium text-2xl">Create an Account?</h2>
      <form onSubmit={handleSubmit(signUp)} className="mt-4">
        <div className="space-y-5">
          <Input 
          label="Full Name:"
          
          placeholder="Enter Your Name"
          {...register("name",{
            required:true
          })}
          />
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
          <Button type="submit" className="w-full">Sign Up</Button>
        </div>


      </form>
      <p>Already have an account? <Link to="/login" className="font-medium text-pretty hover:underline duration-200 transition-all" >Login</Link></p>
      {error && <p className="text-red-600 text-center">{error}</p>}
      </div>

    </div>
  )
}
export default SignUp