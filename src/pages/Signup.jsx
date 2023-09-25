import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";


const Signup = () => {

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [role, setRole] = useState('viewer')

    const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{4,29}$/
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/


    // input validation

    useEffect(() => {
        usernameRegex.test(username) ? setValidUsername(true) : setValidUsername(false)
    }, [username])

    useEffect(() => {
        passwordRegex.test(password) ? setValidPassword(true) : setValidPassword(false)
    }, [password])



    // setting classes based on validation

    const [usernameStyle, setUsernameStyle] = useState('')
    const [passwordStyle, setPasswordStyle] = useState('')

    const setClasses = () => {
        validUsername ? setUsernameStyle('') : setUsernameStyle('error')
        validPassword ? setPasswordStyle('') : setPasswordStyle('error')
    }


    // submit handling

    const { error, setError, loading, signup } = useSignup()

    const handleSubmit = async e => {
        e.preventDefault()
        setClasses()

        if (!username || !password) {
            setError('All fields must be filled')
            return
        }

        await signup(username, password, role)

    }


    return ( 
        <form className="login-form" onSubmit={handleSubmit}>
            <h2>Sign up for free</h2>
            <label htmlFor="username">Username</label>
            <input 
                className={usernameStyle}
                type="text"
                id="username" 
                name="username"
                autoComplete="off"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />

            <label htmlFor="username">Password</label>
            <input 
                className={passwordStyle}
                type="password"
                id="password" 
                name="password"
                autoComplete="off"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />

            <label htmlFor="role">Choose your role:</label>
            <select 
                name="role" 
                id="role"
                onChange={e => setRole(e.target.value)}
            >
                <option value="viewer">Viewer</option>
                <option value="writer">Writer</option>
            </select>

            <Link className="login-form__link" to='/login'>Login</Link>
            <button className="button" disabled={loading}>Sign up</button>
            {error && <p className="error-message">{error}</p>}
        </form>
     );
}
 
export default Signup;