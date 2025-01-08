import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export const AuthLayout = ({children, authentication=true}) => {
  const [loading,setLoading]=useState(true)
const authStatus=useSelector((state)=>state.auth.status)
const nav=useNavigate()
  useEffect(()=>{
     if(authentication && authStatus!==authentication){
        nav("/login")
        
     }else if(!authentication && authStatus !==authentication){
        nav("/")
     }
     setLoading(false)
  },[authStatus,nav,authentication])
  return loading ? <h1>Loading...</h1> : <>{children}</>
}
