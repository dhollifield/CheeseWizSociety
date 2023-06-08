import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatInTimeZone } from "date-fns-tz";

export const AllPosts = () => {
    const currentUser = localStorage.getItem("user")
    const cheeseUserObject = JSON.parse(currentUser)

    const [posts, setPosts] = useState([])

    const formatDateTime = (postDateTime) => {
        const convertDateTime = new Date(postDateTime);

        return formatInTimeZone(
            convertDateTime,
            "America/Chicago",
            "LLLL d, yyy"
        );
    };

    useEffect(() => {
        const fetchPosts = async () => {
        const response = await fetch (`/Posts`)
        const posts = await response.json()
        setPosts(posts)
    }
    fetchPosts()
    console.log(posts)
    }, []);    

    return (
        <>
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

// <Card>
//     <CardLink>
//         <img 
//             alt="Card"
//             src={
//                 <PostCard 
//                     key={post.id}
//                     post={post}
//                     cheeseUserObject={cheeseUserObject}
//                     setPosts={setPosts}
//                 />
//             }
//         />
//     </CardLink>
//         Posted by:
//     <CardLink href={
//         <PostCard 
//         key={post.id}
//         post={post}
//         cheeseUserObject={cheeseUserObject}
//         setPosts={setPosts}
//     />
//     }>{post.user.userName}</CardLink>
// </Card>