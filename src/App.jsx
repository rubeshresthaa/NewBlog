import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import authService from './appwrite/auth'
import { login, logout } from './features/authSlice'
import Header from "./components/Headers/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";


function App() {
  
const [loading,setLoading]=useState(true);
const dispatch=useDispatch()

useEffect(()=>{
 const fetchData=async ()=>{
  try {
    const userData=await authService.getAccount();
    if(userData){
      dispatch(login(userData))
    }else{
      dispatch(logout())
    }
  } catch (error) {
    
    dispatch(logout())
  }finally{
    setLoading(false)
  }

 }
 fetchData()
},[])

if(loading){
  return <h1>Loading...</h1>
}
  return (
    <div>
      <Header />
      <Outlet />
      
    </div>
  )
}

export default App
