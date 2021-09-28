import IndexLeftSideBar from '../components/IndexLeftSideBar';
import { useHistory } from 'react-router-dom';
import '../components/Index.modules.css';

const Index = (props) => {
    const history = useHistory();

    return (
        <div className="container">
            <div className="main">
                <IndexLeftSideBar/>
                <div className="right-side">
                    <div id="right-side-content">
                        <img id="twitter-icon" src="https://img.icons8.com/color/48/000000/twitter--v1.png" alt="Twitter Icon"/>
                        <h2>See what's happening in<br/>the world right now</h2><br/>
                        <p>Join Twitter today.</p>
                        <button id="sign-up-btn" onClick={() => history.push('/signup')}>Sign Up</button> <br/>
                        <button id="log-in-btn" onClick={() => history.push('/login')}>Log In</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index;