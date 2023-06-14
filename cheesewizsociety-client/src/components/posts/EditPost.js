import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import "./AllPosts.css";

export const EditPost = () => {
    const currentUser = localStorage.getItem("user")
    const cheeseUserObject = JSON.parse(currentUser)

    const [editedPost, setEditedPost] = useState({
        title: '',
        imageUrl: '',
        caption: '',
        user: null
    });
    
    const { postId } = useParams();
    const navigate = useNavigate();

    useEffect(
        () => {
            const fetchPostsById = async (postId) => {
                const response = await fetch(`https://localhost:7241/api/Posts/${postId}`)
                const post = await response.json()
                setEditedPost(post)
              }
              fetchPostsById(postId)
            }, []);
    

    const handleSaveButtonClick = (e) => {
        e.preventDefault();
        
        const savePost = async () => {
            editedPost.user = null;
            const options = {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editedPost)
            } 
            await fetch (`https://localhost:7241/api/Posts/${postId}`, options)
            
        }
        savePost(postId);
        navigate(`/Posts`)
    }

    return (
        <Form key={editedPost.id}>
            <FormGroup>
                <Label for="post-title">
                    Title
                </Label>
                <Input
                    id="post-title"
                    name="post-title"
                    placeholder="Give your post a title"
                    type="text"
                    value={editedPost.title}
                    onChange={(e) => {
                        const copy = { ...editedPost };
                        copy.title = e.target.value;
                        setEditedPost(copy)
                    }}
                />
            </FormGroup>        
            <FormGroup>
                <Label for="image">
                ImageUrl
                </Label>
                <Input
                id="image"
                name="image"
                placeholder="Image URL here, please"
                type="text"
                value={editedPost.imageUrl}
                    onChange={(e) => {
                        const copy = { ...editedPost };
                        copy.imageUrl = e.target.value;
                        setEditedPost(copy)
                    }}
                />
            </FormGroup>  
            <FormGroup>
                <Label for="caption">
                    What would you like to say?
                </Label>
                <Input
                    id="caption"
                    name="caption"
                    type="textarea"
                    rows="5"
                    cols="10"
                    value={editedPost.caption}
                    onChange={(e) => {
                        const copy = { ...editedPost };
                        copy.caption = e.target.value;
                        setEditedPost(copy)
                    }}
                />
            </FormGroup>
            <Button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>
                Submit Post
            </Button>
        </Form>
    )
}
    