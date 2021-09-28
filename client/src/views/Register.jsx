import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import IndexLeftSideBar from "../components/IndexLeftSideBar";
import TextField from '@material-ui/core/TextField';
import '../components/Register.modules.css';

const Register = (props) => {
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ errors, setErrors ] = useState(null);
    const history = useHistory();
    const [ user, setUser ] = useState({});
    const { setLoggedIn } = props;

    const register = (event) => {
        event.preventDefault();
    
        const newUser = { firstName, lastName, username, email, password, confirmPassword };
    
        axios.post("http://localhost:8000/api/register", newUser, {
            withCredentials: true,
        })
            .then((res) => {
            console.log(res);
            setFirstName("");
            setLastName("");
            setUsername("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setLoggedIn();
            localStorage.setItem('token', res.data.user._id);
            setUser(res.data.user);
            history.push('/home');
            })
            .catch((err) => {
            console.log(err);
            setErrors(err.response.data.errors);
            });
        };

        return (
            <div className="container">
                <div className="main">
                    <IndexLeftSideBar/>
                    <div className="right-side">
                        <div id="right-side-content">
                            <h3>Join Twitter today.</h3>
                            <form onSubmit={ register }>
                                <TextField id="outlined-basic" label="First Name" variant="outlined" onChange={ (e) => setFirstName(e.target.value) } value={ firstName } style={{ width: '100%', marginTop: '2%' }} />
                                {errors?.firstName && (
                                    <span className="error-message">
                                    {errors.firstName?.properties?.message}
                                    </span>
                                )}
                                <TextField id="outlined-basic" label="Last Name" variant="outlined" onChange={ (e) => setLastName(e.target.value) } value={ lastName } style={{ width: '100%', marginTop: '4%' }}/>
                                {errors?.lastName && (
                                    <span className="error-message">
                                    {errors.lastName?.properties?.message}
                                    </span>
                                )}
                                <TextField id="outlined-basic" label="Username" variant="outlined" onChange={ (e) => setUsername(e.target.value) } value={ username } style={{ width: '100%', marginTop: '2%' }} />
                                {errors?.username && (
                                    <span className="error-message">
                                    {errors.username?.properties?.message}
                                    </span>
                                )}
                                <TextField id="outlined-basic" label="Email" variant="outlined" onChange={ (e) => setEmail(e.target.value) } value={ email } type="email" style={{ width: '100%', marginTop: '4%' }}/>
                                {errors?.email && (
                                    <span className="error-message">
                                    {errors.email?.properties?.message}
                                    </span>
                                )}
                                <TextField id="outlined-basic" label="Password" variant="outlined" onChange={ (e) => setPassword(e.target.value) } value={ password } type="password" style={{ width: '100%', marginTop: '2%' }} />
                                {errors?.password && (
                                    <span className="error-message">
                                    {errors.password?.properties?.message}
                                    </span>
                                )}
                                <TextField id="outlined-basic" label="Confirm Password" variant="outlined" onChange={ (e) => setConfirmPassword(e.target.value) } value={ confirmPassword } type="password" style={{ width: '100%', marginTop: '4%' }}/>
                                {errors?.confirmPassword && (
                                    <span className="error-message">
                                    {errors.confirmPassword?.properties?.message}
                                    </span>
                                )}
                                <button>Create Account</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
}


export default Register;