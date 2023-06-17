import {useEffect, useState} from "react";
import { useParams, Link } from 'react-router-dom';
import { ListGroup, ListGroupItem } from "reactstrap";
import { FetchCommentsByPostId } from "../APIManager";


function PostComments({id, post, setPost, cheeseUserObject}) {
    const PostId = id;

    const [comments, setComments] = useState([
        {
          comment: "",
          user: {
            userName: "",
          }
        }
      ])
    
    console.log("COMMENTS", comments)
    console.log("USER", cheeseUserObject)
    console.log("POST", post)

    useEffect(() => {
        const fetchComments = async () => {
            const commentsArray = await FetchCommentsByPostId(PostId)
            setComments(commentsArray)
            setPost()
        }
        fetchComments()
    }, [PostId])
    

    const userId = cheeseUserObject.Id

    const [newComment, setNewComment] = useState({
        comment: "",
        userName: "",
        userId: userId,
        postId: id
    })

    const handleSaveButtonClick = (e) => {
        e.preventDefault();
        console.log("You clicked the button!");

        const commentToSendToAPI = {
            comment: newComment.comment,
            userName: newComment.userName,
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
            userName: '',
            userId: userId,
            postId: id
        });
    }

    return ( 
        <>
        {comments.postId === id ? (
            <ListGroup key={comments.id}>
              <>
                {comments.map((comment) => {
                  return (
                    
                    <ListGroupItem key={comment.id}>
                      {comment.user.userName + ": " + comment.comment}
                    </ListGroupItem>
                  )
                })}
              </>
            </ListGroup> 
            ) : (
            <></>
            )}
        </>
    )
}

export default PostComments;



    // <>
    //     <section className="comments-section">
    //         <h5 className="comments-title">Comments</h5>
    //         <article className="comments">
    //             {comments.map((comment) => {
    //                 return (
    //                     <section className="comment" key={comment.id}>
    //                         <section className="userComment">{comment.comment}</section>
    //                         <section className="userName">--{comment.user.fullname}--</section>
    //                         <Link to={`/comments/${comment.id}/edit`} className="editComment"><button className="editCommentButton">EDIT COMMENT</button></Link>
    //                     </section>
    //                 )
    //             })}
    //         </article>

    //         <form className="commentForm">
    //             <fieldset>
    //                 <div className="form-group">
    //                 <label className="newCommentsHeading" htmlFor="description">
    //                     Add New Comment:{" "}
    //                 </label>
    //                 <input
    //                     required
    //                     autoFocus
    //                     type="text"
    //                     className="commentInput"
    //                     placeholder="Add your comment here!"
    //                     value={newComment.comment}
    //                     onChange={(evt) => {
    //                     const copy = { ...newComment };
    //                     copy.comment = evt.target.value;
    //                     setNewComment(copy);
    //                     }}
    //                 />
    //                 </div>
    //             </fieldset>

    //             <button
    //                 onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
    //                 className="btn btn-primary"
    //             >
    //                 Save New Comment
    //             </button>
    //         </form>
    //     </section>
    //     </>