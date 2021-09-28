import LeftSidebar from "../components/LeftSidebar";
import MiddleBarProfile from "../components/MiddleBarProfile";
import RightSidebar from "../components/RightSidebar";
import { useState } from "react";
import axios from "axios";

const Profile = (props) => {
    const { logout, setLoggedIn, user } = props;
    const [ newsArticles, setNewsArticles ] = useState([]);

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
                    <MiddleBarProfile user={ user }/>
                    <RightSidebar newsArticles={ newsArticles }/>
                </div>
            </div>
        </div>
    )
}

export default Profile;