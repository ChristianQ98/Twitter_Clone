import { useEffect, useState } from 'react';
import axios from 'axios';
import Tweet from '../components/Tweet';
import '../components/Home.modules.css';
import { useHistory } from 'react-router-dom';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';

const Home = (props) => {
    const [ newsArticles, setNewsArticles ] = useState([]);
    const [ user, setUser ] = useState({});
    const { logout, setLoggedIn } = props;
    const history = useHistory();

    useEffect(() => {
        axios.get('https://newsapi.org/v2/top-headlines?country=us&page=1&pageSize=5&apiKey=00eb7c1c793f4f3e952d1d37708df120')
        .then(res => {
            console.log(res)
            setNewsArticles(res.data.articles)
        })
        .catch(err => console.log(err));
    }, []);

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
            setLoggedIn(false);
            history.push('/');
        }
    }, []);

    const loggedInUser = () => {
        axios.get('http://localhost:8000/api/users/loggedin', {
            withCredentials: true
        })
            .then(res => {
                console.log(res);
                setLoggedIn(true);
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="container">
            <div className="page">
                <div id="flex-page">
                    <LeftSidebar logout={ logout } loggedInUser={ loggedInUser } setLoggedIn={ () => setLoggedIn(true)} user={ user }/>
                    <Tweet user={ user }/>
                    <RightSidebar newsArticles={ newsArticles }/>
                </div>
            </div>
        </div>
    )
}

export default Home;
