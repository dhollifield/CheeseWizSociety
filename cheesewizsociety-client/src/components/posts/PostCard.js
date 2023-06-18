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
 
  const navigate = useNavigate();
    
    useEffect(() => {
      const fetchPost = async () => {
        const response = await fetch (`https://localhost:7241/api/Posts/GetPostByIdWithComments/${postId}`)
        const post = await response.json()
        setPost(post[0])
      } 
      fetchPost()
    }, [postId])

  const editButton = () => {
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
              <CardTitle tag="h4">{post.title}</CardTitle>
              <CardText>{post.caption}</CardText>
              Posted by:
              <CardLink href={`/Users/${post.user.id}`}>
                {post.user.userName}
              </CardLink>
                <div className="comments-container">
                  <h6>Comments</h6>
                <div className="comment-section">
                <ListGroup>
                  {post.comments.map((comment) => {
                    return (
                    <ListGroupItem>
                      <p className="comment-user-name">{comment.user.userName}</p> 
                      <p>{comment.comment}</p>
                    </ListGroupItem>
                    )
                  })}
                </ListGroup>
                </div>
                </div>
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
