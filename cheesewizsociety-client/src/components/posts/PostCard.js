import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardLink,
  CardTitle,
  CardText
} from "reactstrap";
import { formatInTimeZone } from "date-fns-tz";
import "./AllPosts.css"
// import PostComments from "./PostComments";


export const PostCard = () => {
  const [post, setPost] = useState({
    title: " ",
    imageUrl: " ",
    caption: " ",
    dateCreated: " ",
    user: {
      userName: " ",
    }
  });
  const [comments, setComments] = useState([])

  const currentUser = localStorage.getItem("user")
  const cheeseUserObject = JSON.parse(currentUser)

  const { id } = useParams();

  const navigate = useNavigate();

  const formatPostDateTime = (postDateTime) => {
    const convertDateTime = new Date(parseInt(postDateTime));

    return formatInTimeZone(
      convertDateTime,
      "America/Chicago",
      "LLLL d, yyyy 'at' h:mm a zzz"
    );
  };

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch (`https://localhost:7241/api/Posts/${id}`)
      const post = await response.json()
      setPost(post)
    }
    fetchPost(post)
  }, [])

  const editButton = (postId) => {
            console.log(id)
            return (
              <Link to={`/editPost/${postId}`}>
                <button className="edit-post-button">
                  Edit Post
                </button>                                       
              </Link>
            );
        };
    
        const deleteButton = (id) => {
            const deletePost = async () => {
            const options = {
              method: "DELETE",
            };
            await fetch(`https://localhost:7241/api/Posts/${id}`, options);
          };
          deletePost().then(() => navigate(`/Posts`))
        };
        
        return (
          <>
          <CardLink className="back-button">
            <Button 
                color="dark"
                size="lg"
                className="profile-back-button"
                href={`/Posts`}>Back to Posts</Button>
        </CardLink>
          <Card key={post.id}
            className="post-card"
          >
            <img alt="Card" src={post.imageUrl} />
            <CardBody>
              <CardTitle tag="h5">{post.title}</CardTitle>
              <CardText>{post.caption}</CardText>
              <CardText>{post.dateCreated}</CardText>
              Posted by:
              <CardLink href={`/Users/${post.user.id}`}>
                {post.user.userName}
              </CardLink>
            </CardBody>
            <div className="post-buttons">
              {cheeseUserObject.Id === post.user.id ? (
                <>
                    <>{editButton(post.id)}</>
        
                  <button
                    className="delete-post-button"
                    onClick={() => deleteButton(post.id)}
                  >
                    Delete Post
                  </button>
                </>
              ) : (
                <></>
              )}
            </div>
            {/* <PostComments 
              key={post.id}
              post={post}
              cheeseUserObject={cheeseUserObject}
              setPost={setPost}
            /> */}
          </Card>
          </>
        );
      }






// import React, {useEffect, useState} from "react";

// import { Link, useParams, useNavigate } from "react-router-dom";
// import { FetchPostsByIdWithComments } from "../APIManager";


// export default function PostCard({post, cheeseUserObject, setPosts}) {
    
//     const navigate = useNavigate();
//     const { id } = useParams;

//     const fetchPosts = async () => {
//         const postsArray = await FetchPostsByIdWithComments()
//         setPosts(postsArray)
//     }
  

//     const editButton = (id) => {
//         console.log(id)
//         return (
//           <Link to={`/editPost/${id}`}>
//             <button className="edit-post-button">Edit Post</button>                                       
//           </Link>
//         );
//     };

//     const deleteButton = (id) => {
//         const deletePost = async () => {
//         const options = {
//           method: "DELETE",
//         };
//         await fetch(`https://localhost:7241/api/Posts/${id}`, options);
//       };
//       deletePost().then(() => fetchPosts())
//     };


// }
