import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";


const Login = () => {

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)

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

    const { error, setError, loading, login } = useLogin()

    const handleSubmit = async e => {
        e.preventDefault()
        setClasses()

        if (!username || !password) {
            setError('All fields must be filled')
            return
        }

        await login(username, password)

    }


    return ( 
        <form className="login-form" onSubmit={handleSubmit}>
            <h2>Log in</h2>
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
            <Link className="login-form__link" to='/signup'>signup</Link>
            <button className="button" disabled={loading}>Login</button>
            {error && <p className="error-message">{error}</p>}
        </form>
     );
}
 
export default Login;