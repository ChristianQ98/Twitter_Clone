import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import './Tweet.modules.css';

const Tweet = (props) => {
    const [ content, setContent ] = useState("");
    const [ tweets, setTweets ] = useState([]);
    const [ users, setUsers ] = useState([]);
    const { user } = props;
    const [ isLiked, setIsLiked ] = useState(false);
    const [ like, setLike ] = useState(0);
    moment().format()

    // Sends the tweet and stores the content in the DB
    const handleSubmit = (e) => {
        // Prevents page from reloading
        e.preventDefault();
        axios.post('http://localhost:8000/api/tweets', {
            userId: user._id,
            content,
            postedBy: user
        })
            .then(res => {
                console.log(res);
                setContent('');
            })
            .catch(err => console.log(err));
    };

    // Retrieves all the tweets from the DB
    // Used to display all the tweets onto the timeline
    useEffect(() => {
        axios.get('http://localhost:8000/api/tweets')
            .then(res => {
                console.log(res);
                setTweets(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    // Deletes Tweet
    const deleteTweet = (tweet_id) => {
        axios.delete(`http://localhost:8000/api/tweets/${tweet_id}`)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

    // Handles liking a tweet
    // const likeTweet = (tweet_id) => {
        
    //     axios.put(`http://localhost:8000/api/tweets/${tweet_id}`, {
    //         likes: isLiked ? likes - 1 : likes + 1
    //     },)
    //         .then(res => {
    //             setIsLiked(!isLiked);
    //             console.log(res.data);
    //         })
    //         .catch(err => console.log(err));
    // };

    // Handles liking/disliking a tweet
    const likeTweet = (tweet) => {
        axios.put('http://localhost:8000/api/tweets/' + tweet._id + '/like', {
            userId: user
        })
            .then(res => {
                setLike(isLiked ? like - 1 : like + 1);
                setIsLiked(!isLiked);
                console.log(res);
                console.log("Like successful");
            })
                .catch(err => console.log(err));
    };

    return (
        <div id="middle-bar">
            <div id="header" className="btm-border-gray">
                <p style={{ padding: '2.5%', fontSize: '1.2rem', fontWeight: '600' }}>Home</p>
            </div>
            <div className="btm-border-gray">
                <div style={{ display: 'flex', alignItems: 'center', padding: '2.5%' }}>
                    <img src="https://img.icons8.com/ios-filled/60/000000/user-male-circle.png" alt="Profile Icon"/>
                    <form onSubmit={ handleSubmit }>
                        <textarea id="text-box" placeholder="What's happening?" onChange={ (e) => setContent(e.target.value) } value={ content } style={{ font: 'message-box', fontSize: '1.2rem' }}></textarea>
                        { content.length < 1 ? <button disabled className="tweet-disabled" style={{ width: '15%', height: '3.5vh', fontSize: '0.9rem', margin: 'auto', display: 'flex', alignItems: 'center', marginLeft: '82%' }}><span style={{ margin: 'auto' }}>Tweet</span></button> : 
                        <button className="tweet-btn" style={{ width: '15%', height: '3.5vh', fontSize: '0.9rem', margin: 'auto', display: 'flex', alignItems: 'center', marginLeft: '82%' }}><span style={{ margin: 'auto' }}>Tweet</span></button> }
                    </form>
                </div>
            </div>
            <div className="tweets-section">
                { tweets ? tweets.map((tweet, idx) => {
                    return (
                        <div className="tweets" key={ idx }>
                            <div className="tweet-flex">
                                <div className="profile pic">
                                    <img src="https://img.icons8.com/ios-filled/48/000000/user-male-circle.png" alt="Profile Icon"/>
                                </div>
                                <div className="main-tweet-content">
                                    <p style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={{ fontWeight: '700' }}>{ tweet.postedBy.firstName }</span> 
                                        &nbsp;<span style={{ color: 'gray', fontWeight: '500' }}>@{ tweet.postedBy.username }</span>
                                        &nbsp;<span style={{ color: 'gray', fontWeight: '600', marginBottom:'2%' }}>.</span>
                                        &nbsp;<span style={{ color: 'gray', fontWeight: '500' }}>{ moment(tweet.createdAt).fromNow() }</span>
                                    </p>
                                    <p style={{ marginTop: '1%', fontWeight: '400' }}>{ tweet.content }</p>
                                    <div className="tweet-analytics">
                                        <div className="tweet-analytic-numbers" id="comments">
                                            <img src="https://img.icons8.com/material-outlined/20/000000/topic--v1.png"/>
                                            <p style={{ marginLeft: '30%', fontWeight: '500' }}>0</p>
                                        </div>
                                        <div className="tweet-analytic-numbers" id="retweets">
                                            <img src="https://img.icons8.com/material-outlined/20/000000/retweet.png"/>
                                            <p style={{ marginLeft: '30%', color: 'gray', fontWeight: '500' }}>0</p>
                                        </div>
                                        <div className="tweet-analytic-numbers" id="likes" onClick={ () => likeTweet(tweet) }>
                                            <img src="https://img.icons8.com/material-outlined/20/000000/filled-like.png"/>
                                            <p style={{ marginLeft: '30%', color: 'gray', fontWeight: '500' }}>{ tweet.likes.length }</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="delete-tweet-btn">
                                    <p>...</p>
                                </div>
                            </div>
                        </div>
                    )
                }) : <p></p> }
            </div>
        </div>
    )
}

export default Tweet;