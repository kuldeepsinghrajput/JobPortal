import './App.css'
import Browse from './Browse';
import Ajobs from './components/admin/Ajobs';
import Applicants from './components/admin/Applicants';
import Companies from './components/admin/Companies';
import JobModal from './components/admin/JobModal';
import ProtectedRule from './components/admin/ProtectedRoutes';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/Home';
import JobDescription from './components/JobDescription';
import Jobs from './components/Jobs';
import Profile from './components/Profile';
import Navbar from './components/Shared/Navbar';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const appRouter=createBrowserRouter(
  [
    {
      path:'/',
      element:<Home/>
        },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'/signup',
      element:<Signup/>
    }, {
      path:'/jobs',
      element:<Jobs/>
    }, {
      path:'/browse',
      element:<Browse/>
    },
    {
      path:'/profile',
      element:<Profile/>
    }, {
      path:'/description/:id',
      element:<JobDescription/>
    },{
      path:'/admin/companies',
      element:<ProtectedRule><Companies/></ProtectedRule>
    },{
      path:'/admin/jobs',
      element:<ProtectedRule><Ajobs/></ProtectedRule>
    },
    {
      path:'/admin/jobs/:id',
      element:<ProtectedRule><JobModal/></ProtectedRule>
    },
    {
      path:'/admin/jobs/:id/applicants',
      element:<ProtectedRule><Applicants/></ProtectedRule>
    }
  ]
)

function App() {
  return ( 
<div>
<RouterProvider router={appRouter}/>
</div>
  )
}

export default App
