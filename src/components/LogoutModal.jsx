import { useLogout } from '../hooks/useLogout'

const LogoutModal = ({ setModal }) => {

    const logout = useLogout()

    const handleClick = () => {
        logout()
        setModal(false)
    }

    return ( 
        <div className="modal logout-modal">
            <div className="inner-modal">
                <h2 style={{width: '80%'}} >Are you sure you want to Log out?</h2>
                <div className="button-box">
                    <button 
                        className="button button-gray"
                        onClick={() => setModal(false)}
                    >No Cancel</button>
                    <button 
                        className="button"
                        onClick={handleClick}
                    >Yes Logout</button>
                </div>
            </div>
        </div>
     );
}
 
export default LogoutModal;