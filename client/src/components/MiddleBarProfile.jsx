import { useState } from "react";
// import './Tweet.modules.css';

const MiddleBarProfile = (props) => {
    const { user } = props;

    return (
        <div id="middle-bar">
            <div id="header" className="btm-border-gray">
                <div style={{ padding: '2.5%', fontSize: '1.2rem', fontWeight: '600', display: 'flex', alignItems: 'center' }}>
                    <img style={{ borderRadius: '2em', backgroundColor: 'gray', padding: '1%' }} src="https://img.icons8.com/fluency-systems-filled/20/000000/long-arrow-left.png"/> &nbsp;&nbsp;&nbsp;&nbsp;
                    <div>{ user.firstName }</div>
                </div>
            </div>
        </div>
    )

}

export default MiddleBarProfile;