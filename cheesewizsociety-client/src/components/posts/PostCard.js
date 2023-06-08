import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardLink,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import { FetchPostByIdWithComments } from "../APIManager";

export const PostCard = () => {
  const [post, setPost] = useState({
    title: '',
    imageUrl: '',
    caption: '',
    dateCreated: '',
    user: [],
    comments: [],
  })

  const currentUser = localStorage.getItem("user")
  const cheeseUserObject = JSON.parse(currentUser)

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchPostByIdWithComments = async () => {
    const data = await FetchPostByIdWithComments()
    setPost(data)
  }

  useEffect (() => {
    fetchPostByIdWithComments()
  },
  [])

  const editButton = (id) => {
            console.log(id)
            return (
              <Link to={`/editPost/${id}`}>
                <button className="edit-post-button">Edit Post</button>                                       
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
            <ListGroup className="comment">
              <CardTitle className="text-center">Comments</CardTitle>
              {post.comments.map((comment) => {
                return (
                  <ListGroupItem className="comment-group">
                    <a
                      href={`/Users/${comment.user.id}`}
                      className="comment-user"
                    >
                      {comment.user.userName}
                    </a>
                    :{comment.comment}
                  </ListGroupItem>
                );
              })}
            </ListGroup>
          </Card>
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
