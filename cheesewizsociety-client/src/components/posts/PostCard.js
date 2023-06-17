import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardLink,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import { formatInTimeZone } from "date-fns-tz";
import "./AllPosts.css"
import PostComments from "./PostComments";
// import PostComments from "./PostComments";


export const PostCard = () => {
  const [post, setPost] = useState({
    title: " ",
    imageUrl: " ",
    caption: " ",
    dateCreated: " ",
    user: {
      id: 0,
      userName: " ",
    },
    comments: [
      {
        comment: " ",
        user: {
          id: 0,
          userName: " ",
        }
      }
    ]
  });

  const { postId } = useParams();
  
  const currentUser = localStorage.getItem("user")
  const cheeseUserObject = JSON.parse(currentUser)

  // console.log("POST_ID", post.id)

  
  
  const navigate = useNavigate();

  const formatPostDateTime = (postDateTime) => {
    const convertDateTime = new Date(parseInt(postDateTime));
    
    return formatInTimeZone(
      convertDateTime,
      "America/Chicago",
      "LLLL d, yyyy 'at' h:mm a zzz"
      );
    };
    // const postId = post.id

    
    useEffect(() => {
      console.log("ID OF POST", postId)
      const fetchPost = async () => {
        const response = await fetch (`https://localhost:7241/api/Posts/GetPostByIdWithComments/${postId}`)
        const post = await response.json()
        setPost(post[0])
        console.warn("POST FROM FETCH", post)
      } 
      fetchPost()
    }, [postId])
  
    console.log("POSTID", postId)

    
    // console.warn("COMMENTS", comments)
    
  // useEffect(() => {
  //   const fetchComments = async () => {
  //     const response = await fetch (`https://localhost:7241/api/Comments/${postId}`)
  //     const commentsArray = await response.json()
  //     setComments(commentsArray)
  //     console.warn("COMMENTS", commentsArray)
  //   }
  //   fetchComments()
  // }, [postId]);

  const editButton = () => {
            // console.log(id)
            return (
              <Link to={`/editPost/${postId}`}>
                <button className="edit-post-button">
                  Edit Post
                </button>                                       
              </Link>
            );
        };
    
  const deleteButton = () => {
      const deletePost = async () => {
      const options = {
        method: "DELETE",
      };
      await fetch(`https://localhost:7241/api/Posts/${postId}`, options);
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
              {/* <PostComments
                  name={post.comments}
                  id={post.id}
                  post={post}
                  setPost={setPost}
                  cheeseUserObject={cheeseUserObject}
              /> */}
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
