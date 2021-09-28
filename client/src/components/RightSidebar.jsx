const RightSidebar = (props) => {
    const { newsArticles } = props;

    return (
        <div id="right-bar">
            <div id="search-bar" style={{ padding: '2.5%', fontSize: '1.2rem', fontWeight: '600' }}>
                <form id="nav-search" className="form-search" action="/search" role="search">
                    <img src="https://img.icons8.com/ios-glyphs/27/000000/search--v1.png" alt="Search Icon"/> &nbsp;&nbsp;&nbsp;
                    <input id="search-query" className="search-input" type="text" placeholder="Search Twitter" />
                </form>
            </div>
            <div id="news-feed">
                <h3>What's happening</h3>
                { newsArticles.length > 0 ? newsArticles.map( (article, idx) => {
                    return (
                        <div className="articles">
                            <div className="articles-content">
                                <h6 key={idx}>{article.title}</h6> &nbsp;&nbsp;&nbsp;
                                <img className="articles-img" src={`${article.urlToImage}`} alt="News Article Pic"/>
                            </div>
                        </div>
                    )
                }) : <p></p> }
            </div>
        </div>
    )
}

export default RightSidebar;