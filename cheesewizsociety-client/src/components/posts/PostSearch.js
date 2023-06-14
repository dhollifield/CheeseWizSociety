import { useState } from "react";

export const PostSearch = () => {
    const [searchInput, setSearchInput] = useState("");
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
        const response = await fetch (`/Posts`)
        const posts = await response.json()
        setPosts(posts)
    }
    fetchPosts()
    console.log(posts)
    }, []);  

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    if (searchInput.length > 0 ) {
        posts.filter((post) => {
            return post.caption.match(searchInput)
        })
    };

    return (
        <>
        <div>
            <input
                type="search"
                placeholder="Search word here"
                onChange={handleChange}
                value={searchInput} />
        </div>
        <div className="add-post-button">
                <Link to={`/addNewPost`} className="add-new-post-link">
                    <button className="add-new-post-button">ADD A POST</button>
                </Link>
            </div>
            <div className="post-card-container">
                {posts.map((post) => {
                    return (
                        <>
                        <div className="post-preview-card">
                            <a href={`/Posts/${post.id}`}>
                                <img className="post-image" alt="Card" src={post.imageUrl} />
                            </a>
                            <div className="post-text">
                                <h5 className="post-title">{post.title}</h5>
                                <h6 className="post-author-with-date">{"By " + post.user.userName + " on " } {formatDateTime(post.dateCreated)}</h6>
                            </div>
                        </div>
                        </>
                        )
                    })}
            </div>
        </>
    )

}