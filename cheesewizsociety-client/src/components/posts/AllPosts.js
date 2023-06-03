import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {FetchPostsWithComments, FetchPostsBySearch} from "../APIManager";
import {
    Button,
    CardGroup,
    Card,
    CardBody,
    CardLink,
    CardTitle,
    CardText,
    ListGroup,
    ListGroupItem
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

export const AllPosts = () => {
    const [posts, setPosts] = useState([])
    const {searchCriterion} = useParams()

    const navigate = useNavigate();

    const fetchPosts = async () => {
        const postsArray = await FetchPostsWithComments()
        setPosts(postsArray)
    }

    const fetchPostsBySearch = async () => {
        const postsArray = await FetchPostsBySearch(searchCriterion)
        setPosts(postsArray)
    }

    useEffect (() => {
        if (searchCriterion) {
            fetchPostsBySearch()
        } else {
            fetchPosts()
        }
    }, [])

    const editButton = (id) => {
        return (
          <Link to={`/Posts/${id}`}>
            <button className="postButton editPostButton">Edit Post</button>                                       
          </Link>
        );
    };

    const deleteButton = (id) => {
        return (
        <Link
            onClick={() => {
            const deletePost = async () => {
                const options = {
                method: "DELETE",
                };
                await fetch(`/Posts/${id}`, options);
                fetchPosts();
            };
            deletePost();
            navigate(`/`)
            }}
        >
            <button 
            className="postButton deletePostButton"
            >
            Delete Post
            </button>
        </Link>
        );
    };

    return (
        <>
        <div className="add-post-button">
            <Link to={`/addNewPost`} className="add-new-post-link">
                <button className="add-new-post-button">ADD A POST</button>
            </Link>
        </div>
        <div class="input-group rounded">
            <input type="search" class="form-control rounded" placeholder="Search Posts" aria-label="Search" aria-describedby="search-addon" />
            <span className="input-group-text border-0" id="search-addon">
                <i className="fas fa-search">{searchCriterion}</i>
            </span>
        </div>
        <CardGroup>
            {posts.map((post) => {
                return (
                <>
                <Card
                style={{
                    width: '18rem'
                }}
                >
                <img
                    alt="Card"
                    src={post.imageUrl}
                />
                <CardBody>
                    <CardTitle tag="h5">
                        {post.title}
                    </CardTitle>
                    <CardText>
                        {post.caption}
                    </CardText>
                    <CardText>
                        {post.dateCreated}
                    </CardText>
                    Posted by:  
                    <CardLink href="#">
                        {post.user.userName}
                    </CardLink>
                </CardBody>
                <div className="post-buttons">
                    
                    <Button 
                        color="warning"
                        className="edit-post-button"
                        onClick={(clickEvent) => editButton(clickEvent)}>
                        Edit Post
                    </Button>
                    <Button 
                        color="danger"
                        className="delete-post-button"
                        onClick={(clickEvent) => deleteButton(clickEvent)}>
                        Delete Post
                    </Button>
                </div>
                <ListGroup className="comment">
                    <CardTitle className="text-center">Comments</CardTitle>
                    {post.comments.map((comment) => {
                        return (
                            <ListGroupItem className="comment">
                                <a href="#" className="comment-user">{comment.user.userName}</a>:{comment.comment}
                            </ListGroupItem>
                        )
                    })}
                </ListGroup>
                </Card>
                </>
                )
            })}
        </CardGroup>
        </>
    )
}