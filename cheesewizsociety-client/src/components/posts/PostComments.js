import {useEffect, useState} from "react";
import { useParams, Link } from 'react-router-dom';
import { 
    FetchCommentsByPostId, 
    AddNewComment,
    DeleteComment, 
    UpdateComment
} from "../APIManager";

function PostComments() {
    const [comments, setComments] = useState({
        comments: ''
    })

    const currentUser = localStorage.getItem("user")
    const cheeseUserObject = JSON.parse(currentUser)

    const { postId } = useParams();

    const fetchComments = async () => {
        console.log(comments)
        const response = await FetchCommentsByPostId(postId);
        const commentsArray = await response.json();
        setComments(commentsArray);
        };
    
        useEffect(() => {
        fetchComments();
        }, [postId])

    const userId = cheeseUserObject.Id

    const [newComment, setNewComment] = useState({
        comment: "",
        userId: userId,
        postId: postId
    })

    const handleSaveButtonClick = (e) => {
        e.preventDefault();
        console.log("You clicked the button!");

        const commentToSendToAPI = {
            comment: newComment.comment,
            userId: newComment.userId,
            postId: newComment.postId
        };

        const saveComment = async () => {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(commentToSendToAPI),
            };
            await fetch(`https://localhost:7241/api/Comments`, options)
        }
        saveComment();
        setNewComment({
            comment: '',
            userId: userId,
            postId: postId
        });
    }

    return ( 
        <>
        <section className="comments-section">
            <h5 className="comments-title">Comments</h5>
            <article className="comments">
                {comments.map((comment) => {
                    return (
                        <section className="comment" key={comment.id}>
                            <section className="userComment">{comment.comment}</section>
                            <section className="userName">--{comment.user.fullname}--</section>
                            <Link to={`/comments/${comment.id}/edit`} className="editComment"><button className="editCommentButton">EDIT COMMENT</button></Link>
                        </section>
                    )
                })}
            </article>

            <form className="commentForm">
                <fieldset>
                    <div className="form-group">
                    <label className="newCommentsHeading" htmlFor="description">
                        Add New Comment:{" "}
                    </label>
                    <input
                        required
                        autoFocus
                        type="text"
                        className="commentInput"
                        placeholder="Add your comment here!"
                        value={newComment.comment}
                        onChange={(evt) => {
                        const copy = { ...newComment };
                        copy.comment = evt.target.value;
                        setNewComment(copy);
                        }}
                    />
                    </div>
                </fieldset>

                <button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="btn btn-primary"
                >
                    Save New Comment
                </button>
            </form>
        </section>
        </>
    )
}

export default PostComments;

