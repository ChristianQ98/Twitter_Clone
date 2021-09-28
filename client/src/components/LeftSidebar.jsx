import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const LeftSidebar = (props) => {
    const { logout, setLoggedIn } = props;
    const { user } = props;
    const history = useHistory();

    return (
        <div id="left-box">
            <div style={{ display: 'flex', alignItems: 'center', outline: 'none', border: 'none' }}>
                <img style={{ padding: '2%', cursor: 'pointer' }} id="twitter-logo" src="https://img.icons8.com/color/42/000000/twitter--v1.png" alt="Twitter Logo"/>
            </div>
            <div className="hover-links" style={{ display: 'flex', alignItems: 'center', width: '42%', padding: '3%', cursor: 'pointer' }} onClick={ () => history.push('/home') }>
                <img src="https://img.icons8.com/ios-glyphs/27/000000/home-page--v1.png" alt="Home Icon"/> &nbsp;&nbsp; Home
            </div>
            <div className="hover-links" style={{ display: 'flex', alignItems: 'center', width: '48%', padding: '3%', cursor: 'pointer' }}>
                <img src="https://img.icons8.com/ios-glyphs/27/000000/hashtag.png" alt="Hashtag Icon"/> &nbsp;&nbsp; Explore
            </div>
            <div className="hover-links" style={{ display: 'flex', alignItems: 'center', width: '62%', padding: '3%', cursor: 'pointer' }}>
                <img src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/27/000000/external-bell-twitter-flatart-icons-outline-flatarticons.png" alt="Bell Icon"/> &nbsp;&nbsp; Notifications
            </div>
            <div className="hover-links" style={{ display: 'flex', alignItems: 'center', width: '54%', padding: '3%', cursor: 'pointer' }}>
                <img src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/27/000000/external-mail-basic-ui-elements-flatart-icons-outline-flatarticons.png" alt="Message Icon"/> &nbsp;&nbsp; Messages
            </div>
            <div className="hover-links" style={{ display: 'flex', alignItems: 'center', width: '58%', padding: '3%', cursor: 'pointer' }}>
                <img src="https://img.icons8.com/material-outlined/27/000000/bookmark-ribbon--v1.png" alt="Bookmark"/> &nbsp;&nbsp; Bookmarks
            </div>
            <div className="hover-links" style={{ display: 'flex', alignItems: 'center', width: '45%', padding: '3%', cursor: 'pointer' }} onClick={() => history.push('/profile')}>
                <img src="https://img.icons8.com/ios/27/000000/user--v1.png" alt="Profile Icon"/> &nbsp;&nbsp; Profile
            </div>
            <div className="tweet-btn" style={{ display: 'flex', alignItems: 'center' }}>
                <p style={{ margin: 'auto' }}>Tweet</p>
            </div>
            <div id="user-tab" onClick={ logout }>
                <div id="user-pic-name">
                    <img src="https://img.icons8.com/ios-filled/48/000000/user-male-circle.png" alt="Profile Icon"/> &nbsp;&nbsp;
                    <div style={{ textAlign: 'left', fontSize: '1.1rem' }}>
                        <div>
                            <p>{ user.firstName }</p>
                            <p style={{ fontSize: '0.9rem', color: 'gray' }}>@{ user.username }</p>
                        </div>
                    </div>
                </div>
                    <div>
                        <p>...</p>
                    </div>
            </div>
        </div>
    )
}

export default LeftSidebar;