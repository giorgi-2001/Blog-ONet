import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Create from './pages/Create';
import Login from './pages/Login'
import BlogDetais from './pages/BlogDetails';
import UpdateBlog from './pages/UpdateBlog';
import Signup from './pages/signup';
import { useAuthContext } from './hooks/useAuthContext';
import { useEffect } from 'react';
import UserLayout from './layouts/userLayout';
import Profile from './pages/userPages/Profile';
import LikedBlogs from './pages/userPages/LikedBlogs';
import MyBlogs from './pages/userPages/MyBlogs';
import ActiveUsers from './pages/userPages/ActiveUsers';
import BannedUsers from './pages/userPages/BannedUsers';

const App = () => {

  const { dispatch, user } = useAuthContext()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    dispatch({type: 'LOGIN', payload: user})
  }, [])

  const isWriter = user?.roles.includes('writer')
  const isAdmin = user?.roles.includes('admin')

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={user ? <Home /> : <Navigate to="login" />} />
        <Route path="create" element={isWriter ? <Create /> : <Navigate to="/" />} />
        <Route path="update/:id" element={isWriter ? <UpdateBlog /> : <Navigate to="/" />} />
        <Route path="login" element={!user ? <Login /> : <Navigate to="/" /> } />
        <Route path="signup" element={!user ? <Signup /> : <Navigate to="/" />} />
        <Route path='/:id' element={user ? <BlogDetais /> : <Navigate to="/" />} />

        <Route path="user" element={user ? <UserLayout /> : <Navigate to="../login" />}>
          <Route index element={<Profile />} />
          <Route path="liked" element={<LikedBlogs />} />
          <Route path="myBlogs" element={isWriter ? <MyBlogs /> : <Navigate to="/user/" />} /> 
          <Route path="activeUsers" element={isAdmin ? <ActiveUsers /> : <Navigate to="/user/" />} />
          <Route path="bannedUsers" element={isAdmin ? <BannedUsers /> : <Navigate to="/user/" />} />
        </Route>
      </Route>
    )
  )


  return ( 
    <RouterProvider router={router} />
   );
}
 
export default App;