import { useDispatch } from "react-redux"
import authService from "../../appwrite/auth"
import { logout } from "../../features/authSlice"


const LogoutBtn = () => {
  const dispatch=useDispatch()
  const logoutHandler=()=>{
    authService.logout().then(()=>{
      dispatch(logout())
    })
  }
  return (
    <button className="bg-blue-900 p-5">Logout</button>
  )
}
export default LogoutBtn