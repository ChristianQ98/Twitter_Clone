import { useState } from "react";
import IndexLeftSideBar from "../components/IndexLeftSideBar";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import '../components/LoginPage.modules.css';

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const history = useHistory();
    const { setLoggedIn } = props;

    // Handles form submission when user attempts to log in
    const login = (e) => {
        // Prevents page from reloading
        e.preventDefault();
        axios.post("http://localhost:8000/api/login",
        { email, password },
        { withCredentials: true })
            .then((res) => {
            console.log(res);
            setLoggedIn(true);
            localStorage.setItem('token', res.data.user._id);
            console.log(res.data.user);
            history.push('/home');
            })
            .catch((err) => {
            console.log(err);
            setErrorMessage(err.response);
            });
    };

    return (
        <div className="container">
            <div className="main">
                <IndexLeftSideBar/>
                <div className="right-side">
                    <div id="right-side-content">
                        <img id="twitter-icon" src="https://img.icons8.com/color/48/000000/twitter--v1.png" alt="Twitter Icon"/>
                        <h2>See what's happening in<br/>the world right now</h2><br/>
                        <p>Login to Twitter</p>
                        <div>
                            { errorMessage ? <p style={{ color: 'red' }}>{ errorMessage }</p> : <p></p> }
                            <form onSubmit={ login }>
                                <TextField id="outlined-basic" label="Email" variant="outlined" onChange={ (e) => setEmail(e.target.value) } value={ email } type="email" style={{ width: '100%', marginTop: '2%' }} />
                                <TextField id="outlined-basic" label="Password" variant="outlined" onChange={ (e) => setPassword(e.target.value) } value={ password } type="password" style={{ width: '100%', marginTop: '4%' }}/>
                                <button>Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;