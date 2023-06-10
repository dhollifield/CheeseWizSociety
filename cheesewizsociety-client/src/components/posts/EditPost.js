import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import "./AllPosts.css";

export const EditPost = () => {
    console.log(useParams());

    const [editedPost, setEditedPost] = useState({
        title: '',
        imageUrl: '',
        caption: ''
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
              console.log(postId)
        },
        [postId]
    );

    // const handleSaveButtonClick = async (event) => {
    //     event.preventDefault();

    //     const response = await fetch(`https://localhost:7241/api/Posts/${editedPost.id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(editedPost),
    //     });
    //     await response.json();
    //     navigate(`/Posts/${editedPost.id}`);
    // }

    const handleSaveButtonClick = (e) => {
        e.preventDefault();

        const savePost = async () => {
            const options = {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editedPost)
            }
            const response = await fetch (`https://localhost:7241/api/Posts/${editedPost.id}`, options)
            await response.json()
            navigate(`/Posts/${editedPost.id}`)
        }
        savePost();
    }

    // return (
    //     <div><h4>2</h4></div>
    // )
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
    
    // const [post, setPost] = useState({
    //     title: '',
    //     imageUrl: '',
    //     caption: '',
    // });
    
    
    // useEffect(() => {
    //     const fetchPost = async () => {
        //         const response = await fetch(`https://localhost:7241/api/Posts/${id}`)
    //         const post = await response.json()
    //         setPost(post)
    //     }
    //     fetchPost()
    //     console.log(post)
    // },
    // [id]);
    
    // const handleSaveButtonClick = (e) => {
        //     e.preventDefault();

    //     const savePost = async () => {
    //         const options = {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(post)
    //         }
    //         const response = await fetch(`https://localhost:7241/api/Posts/${id}`, options)
    //         await response.json()
    //     }
    //     savePost()
    //     navigate(`/Posts`)
    // }

    // return (
    //     <Form key={post.id}>
    //         <FormGroup>
    //             <Label for="post-title">
    //                 Title
    //             </Label>
    //             <Input
    //                 id="post-title"
    //                 name="post-title"
    //                 placeholder="Give your post a title"
    //                 type="text"
    //                 value={post.title}
    //                 onChange={(e) => {
    //                     const copy = { ...post };
    //                     copy.title = e.target.value;
    //                     setPost(copy)
    //                 }}
    //             />
    //         </FormGroup>        
    //         <FormGroup>
    //             <Label for="image">
    //                 ImageUrl
    //             </Label>
    //             <Input
    //             id="image"
    //             name="image"
    //             placeholder="Image URL here, please"
    //             type="text"
    //             value={post.imageUrl}
    //                 onChange={(e) => {
    //                     const copy = { ...post };
    //                     copy.imageUrl = e.target.value;
    //                     setPost(copy)
    //                 }}
    //             />
    //         </FormGroup>  
    //         <FormGroup>
    //             <Label for="caption">
    //                 What would you like to say?
    //             </Label>
    //             <Input
    //                 id="caption"
    //                 name="caption"
    //                 type="textarea"
    //                 rows="5"
    //                 cols="10"
    //                 value={post.caption}
    //                 onChange={(e) => {
    //                     const copy = { ...post };
    //                     copy.caption = e.target.value;
    //                     setPost(copy)
    //                 }}
    //             />
    //         </FormGroup>
    //         <Button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>
    //             Submit Post
    //         </Button>
    //     </Form>
    // )