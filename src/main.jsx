import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter } from 'react-router-dom'
import Home from './components/Home.jsx'
import { AuthLayout } from './components/Authtication/AuthLayout.jsx'
import LoginComponent from './components/Login/LoginComponent.jsx'
import SignUpComponent from './components/Login/SignUpComponent.jsx'
import AllPost from './components/Post-form/AllPost.jsx'
import AddPost from './components/Post-form/AddPost.jsx'
import EditPost from './components/Post-form/EditPost.jsx'
import Post from './components/Post-form/Post.jsx'

const router=createBrowserRouter([
  {
    path:"/",
    element:<App />,
    children:[
      {
        path:"/",
        element:<Home />
      },
      {
        path:"/login",
        element:(
          <AuthLayout authentication={false}>
            <LoginComponent />
          </AuthLayout>
        )
      },
      {
        path:"/signup",
        element:(
          <AuthLayout authentication={false}>
            <SignUpComponent />
          </AuthLayout>
        )
      },
      {
        path:"/all-posts",
        element:(
          <AuthLayout authentication>
            {""}
            <AllPost />
          </AuthLayout>
        )
      },
      {
        path:"/add-post",
        element:(
          <AuthLayout authentication>
            {""}
            <AddPost />
          </AuthLayout>
        )
      },
      {
        path:"/edit-post/:slug",
        element:(
          <AuthLayout authentication>
            {""}
            <EditPost />
          </AuthLayout>
        )
      },
      {
        path:"/post/:slug",
        element:(
          <AuthLayout authentication>
            {""}
            <Post />
          </AuthLayout>
        )
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
   
  </StrictMode>,
)
