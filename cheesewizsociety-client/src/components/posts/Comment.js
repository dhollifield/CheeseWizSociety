import CommentForm from "./CommentForm";

function Comment({
    comment,
    replies,
    cheeseUserObject,
    deleteComment,
    updateComment,
    activeComment,
    addComment,
    setActiveComment,
    postId = null,
}) {

    const canReply = Boolean(cheeseUserObject);
    const canEdit = cheeseUserObject === comment.userId
    const canDelete = cheeseUserObject == comment.userId
    const isReplying = 
        activeComment &&
        activeComment.type === "replying" &&
        activeComment.id === comment.id;
    const isEditing = 
        activeComment &&
        activeComment.type === "editing" &&
        activeComment.id === comment.id;
    const replyId = postId ? postId : comment.id;

    return (
        <div className="comment">
            <div className="comment-right-part">
                <div className="comment-content">
                    <div className="comment-author">{comment.user.username}</div>
                </div>
                {!isEditing && <div className="content-text">{comment.comment}</div>}
                {isEditing && (
                    <CommentForm
                        submitLabel="Update"
                        hasCancelButton
                        initialText={comment.comment}
                        handleSubmit={(text) => updateComment(text, comment.id)}
                        handleCancel={() => setActiveComment(null)}
                    />
                )}
                <div className="comment-actions">
                    {canReply && (
                        <div
                            className="comment-action"
                            onClick={() => 
                                setActiveComment({ id: comment.id, type: "replying" })
                            }
                        >
                            Reply
                        </div>
                    )}
                    {canDelete && 
                        <div 
                            className="comment-action"
                            onClick={() => deleteComment(comment.id)}
                        >
                            Delete
                        </div>
                    }
                    {isReplying && (
                        <CommentForm
                            submitLabel="Reply"
                            handleSubmit={(text) => addComment(text, replyId)}
                        />
                    )}
                    {replies.length > 0 && (
                        <div className="replies">
                            {replies.map(reply => (
                                <Comment 
                                    key={reply.id}
                                    comment={reply}
                                    replies={[]}
                                    cheeseUserObject={cheeseUserObject}
                                    deleteComment={deleteComment}
                                    updateComment={updateComment}
                                    addComment={addComment}
                                    activeComment={activeComment}
                                    setActiveComment={setActiveComment}
                                    postId = {comment.id}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )

}

export default Comment;