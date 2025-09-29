
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Onboard from './components/Onboard.jsx'
import Login from './components/Login.jsx'
import Home from './components/Home.jsx'
import CreateAccount from './components/CreateAccount.jsx'
import PickUp from './components/PickUp.jsx'
import Shop from './components/Shop.jsx'
import Restaurant from './components/Restaurant.jsx'
import SearchResult from './components/SearchResult.jsx'
import ProfileCompletion from './components/ProfileCompletion.jsx'


const route = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path:'/',
        element: <Onboard/>
      },
      {
        path:'/login',
        element: <Login/>
      },
      {
        path:'/home',
        element: <Home/>
      },
      {
        path:'/create-account',
        element: <CreateAccount/>
      },
      {
        path:'/pick-up',
        element: <PickUp/>
      },
      {
        path:'/shop',
        element: <Shop/>
      },
      {
        path:'/restaurant',
        element: <Restaurant/>
      },
      {
        path:'/search-result',
        element: <SearchResult/>
      },
      {
        path:'/profile-completion',
        element: <ProfileCompletion/>
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={route}/>
)
