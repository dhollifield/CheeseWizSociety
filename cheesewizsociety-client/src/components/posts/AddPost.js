import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FetchPosts } from "../APIManager";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import "./AllPosts.css";

export const AddPost = () => {
    const currentUser = localStorage.getItem("user")
    const cheeseUserObject = JSON.parse(currentUser)

    const [newPost, update] = useState({
        title: '',
        imageUrl: '',
        caption: ''
    });

    const navigate = useNavigate();

    const handleSaveButtonClick = (event) => {
        event.preventDefault();

        const dataToSendToAPI = {
            title: newPost.title,
            imageUrl: newPost.imageUrl,
            caption: newPost.caption,
            dateCreated: new Date(),
            userId: cheeseUserObject.Id
        };

        return fetch(`https://localhost:7241/api/Posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSendToAPI)
        })
            .then((response) => response.json())
            .then(() => {
                navigate('/Posts');
            });
    }

    return (
        <Form 
            key={newPost.userId}
            className="add-post-form">
            <FormGroup>
                <Label for="title">
                    Title
                </Label>
                <Input
                    id="title"
                    name="title"
                    placeholder="Give your post a title"
                    type="text"
                    value={newPost.title}
                    onChange={(e) => {
                        const copy = { ...newPost };
                        copy.title = e.target.value;
                        update(copy)
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
                value={newPost.imageUrl}
                    onChange={(e) => {
                        const copy = { ...newPost };
                        copy.imageUrl = e.target.value;
                        update(copy)
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
                    value={newPost.caption}
                    onChange={(e) => {
                        const copy = { ...newPost };
                        copy.caption = e.target.value;
                        update(copy)
                    }}
                />
            </FormGroup>
            <Button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>
                Submit Post
            </Button>
        </Form>
    )
}