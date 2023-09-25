import { NavLink, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const UserLayout = () => {

    const { user } = useAuthContext()

    const isWriter = user.roles.includes('writer')
    const isAdmin = user.roles.includes('admin')

    return ( 
        <div className="user-page">
            <section className="left">
                <nav className="user__nav">
                    <NavLink to="/user/">Profile</NavLink>
                    <NavLink to="/user/liked">Liked blogs</NavLink>
                    {isWriter &&
                    <NavLink to="/user/myBlogs">My blogs</NavLink>}
                    {isAdmin &&<>
                    <NavLink to="/user/activeUsers">Active users</NavLink>
                    <NavLink to="/user/bannedUsers">Banned users</NavLink>
                    </>}
                </nav>
            </section>
            <section className="right">
                <Outlet />
            </section>
        </div>
     );
}
 
export default UserLayout;