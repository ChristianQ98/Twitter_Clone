import Index from './views/Index';
import Login from './views/Login';
import Home from './views/Home';
import { useEffect, useState } from 'react';
import { useHistory, Route, Redirect } from 'react-router-dom';
import './App.css';
import Register from './views/Register';
import Profile from './views/Profile';
import axios from "axios";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();
  const [ user, setUser ] = useState({});

  const logout = () => {
    axios.post("http://localhost:8000/api/logout", {}, {
          // need to send the cookie in request so server can clear it
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        setIsLoggedIn(false);
        localStorage.clear();
      })
      .catch(console.log);

    history.push("/");
  };

  useEffect(() => {
    const userId = localStorage.getItem('token')
    console.log(userId);
    if(userId) {
        axios.get('http://localhost:8000/api/users/loggedin', {
            withCredentials: true
        })
            .then(res => {
                setUser(res.data);
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        setIsLoggedIn(false);
        history.push('/');
    }
}, []);

  return (
    <div className="App">
      <Route exact path="/">
        <Index/>
      </Route>

      <Route exact path="/signup">
        <Register setLoggedIn={ () => setIsLoggedIn(true) }/>
      </Route>

    <Route exact path="/login">
      <Login setLoggedIn={ () => setIsLoggedIn(true) }/>
    </Route>

      <Route exact path="/home">
        <Home logout={ logout } setLoggedIn={ () => setIsLoggedIn(true)}/>
      </Route>

      <Route exact path="/profile">
        <Profile setLoggedIn={ () => setIsLoggedIn(true)} user={ user }/>
      </Route>
    </div>
  );
}

export default App;
