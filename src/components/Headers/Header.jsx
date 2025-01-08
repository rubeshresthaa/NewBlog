import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Container from "../container/Container"
import LogoutBtn from "./LogoutBtn"

const Header = () => {
  const authStatus=useSelector((state)=>state.auth.status)
  const nav=useNavigate()

  const navItems=[
    {
      name:"Home",
      slug:"/",
      active:true
    },
    {
      name:"Login",
      slug:'/login',
      active:!authStatus
    },
    {
      name:"Signup",
      slug:"/signup",
      active:!authStatus
    },
    {
      name:'All Posts',
      slug:'/all-post',
      active:authStatus
    },
    {
      name:"Add Posts",
      slug:"/add-post",
      active:authStatus
    }
  ]
  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <h1 onClick={()=>nav('/')}>New Project</h1>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((items)=>
            {items.active ? (
              <li key={items.name}>
                <button onClick={()=>nav(items.slug)}
                  className="inline-block px-6 py-2 duration-200 hover:bg-blue-400 rounded-full">{items.name}</button>
              </li>
              
            ):null }
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}

          </ul>
        </nav>
      </Container>
    </header>
  )
}
export default Header