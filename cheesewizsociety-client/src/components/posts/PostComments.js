import {useEffect, useState} from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { 
    FetchCommentsByPostId, 
    AddNewComment,
    DeleteComment, 
    UpdateComment
} from "../APIManager";

function PostComments({cheeseUserObject}) {
    const [backendComments, setBackendComments] = useState([])
    const [activeComment, setActiveComment] = useState(null)
    const rootComments = backendComments
        .filter((backendComment) => 
            backendComment.id === null);

    const getReplies = (id) => {
        return backendComments
    }

    const addComment = (comment, postId) => {
        console.log("addComment", comment, postId)
        AddNewComment(comment, postId)
        .then(newComment => {
            setBackendComments([newComment, ...backendComments])
            setActiveComment(null);
        })
    } 

    const deleteComment = (id) => {
        if (window.confirm('Are you sure that you want to remove the comment?')) {
            DeleteComment().then(() => {
                const updatedBackendComments = backendComments.filter(
                    (backendComment) => backendComment.id !== id);
                setBackendComments(updatedBackendComments)
            })
        }
    }

    const updateComment = (id) => {
        UpdateComment(id).then(() => {
            const updatedBackendComments = backendComments.map(backendComment => {
                if (backendComment.id === id) {
                    return (backendComment)
                }
                return backendComment;
            })
            setBackendComments(updatedBackendComments)
            setActiveComment(null);
        })
    }

    useEffect(() => {
        FetchCommentsByPostId().then(data => {
            setBackendComments(data);
            console.log(data)
        })
    }, [])

    return (
        <div className="comments">
            <h3 className="comment-title">Comments</h3>
            <div className="comment-form-title">Write comment</div>
            <CommentForm submitLabel="Write" handleSubmit={addComment}/>
            <div className="comments-container">
                {rootComments.map(rootComment => (
                    <Comment
                        key={rootComment.id}
                        comment={rootComment}
                        replies={getReplies(rootComment.id)}
                        cheeseUserObject={cheeseUserObject}
                        deleteComment={deleteComment}
                        updateComment={updateComment}
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                        addComment={addComment}
                    />
                ))}
            </div>
        </div>
    )
}

export default PostComments;

// export default function PostComments({post, cheeseUserObject, setPost}) {
//     const [comment, setComment] = useState({
//         comment: '',
//         userName: ''
//     })

//     const { PostId } = useParams;


//     useEffect(() => {
//         const fetchComment = async () => {
//             const response = await fetch (`https://localhost:7241/api/Comments/${PostId}`)
//             const comments = await response.json()
//             setComment(comments)
//         }
//             fetchComment()
//             console.warn(comment)
//     }, [])

//     return (
//     <ListGroup key={comment.PostId} className="comment">
//       <CardTitle className="text-center">Comments</CardTitle>
//       {comment.map((comment) => {
//         return (
//           <ListGroupItem className="comment-group">
//               {comment.userName}
//             :{comment.comment}
//           </ListGroupItem>
//         );
//       })}
//     </ListGroup>
//     )
// }


