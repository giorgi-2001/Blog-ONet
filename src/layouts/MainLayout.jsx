import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import LogoutModal from "../components/LogoutModal";

const MainLayout = () => {

    const { user } = useAuthContext()

    const isWriter = user?.roles.includes('writer')

    const [modal, setModal] = useState(false)
 
    const [navClass, setNavClass] = useState('')

    return ( 
        <>
        <header className="header">
            <nav className="header__nav | wrapper">
                <div className={`cover ${navClass}`}></div>
                <Link to="/" className="app-name">
                    <h1>Blog-O Net</h1>
                </Link>
                <div className={`header__nav nav-child ${navClass}`}>
                    <div className="close" onClick={() => setNavClass('')}>✖</div>
                    {isWriter && <NavLink 
                        onClick={() => setNavClass('')} to='/create'
                    >New Blog</NavLink>}
                    {!user && <>
                    <NavLink onClick={() => setNavClass('')} to='/login'>Login</NavLink>
                    <NavLink onClick={() => setNavClass('')} to='/signup'>Signup</NavLink>
                    </>}
                    {user && <>
                    <Link onClick={() => setNavClass('')} to="/user/">{`Profile(${user.username})`}</Link> 
                    <button className="button" onClick={() => {
                        setModal(true)
                        setNavClass('')}}>
                        Logout
                    </button>
                    </>}
                </div>
                <div className="hamburger" onClick={() => setNavClass('show')}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </nav>  
        </header>
        <main className="main | wrapper">
            <Outlet />
        </main>
        {modal && <LogoutModal setModal={setModal} />}
        </>
     );
}
 
export default MainLayout;