import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import "./AllPosts.css";

export const EditPost = () => {
    const currentUser = localStorage.getItem("user")
    const cheeseUserObject = JSON.parse(currentUser)
    
    const { id } = useParams();

    const [editedPost, setEditedPost] = useState({
        title: '',
        imageUrl: '',
        caption: ''
    });

    useEffect(
        () => {
            console.log(id)
            const fetchPostsById = async () => {
                const response = await fetch(`https://localhost:7241/api/Posts/${id}`)
                const post = await response.json()
                setEditedPost(post[0])
              }
              fetchPostsById()
              console.log(editedPost)
        },
        [id]
    );

    const navigate = useNavigate();

    const handleSaveButtonClick = (event) => {
        event.preventDefault();

        const savePost = async (id) => {
            const options = {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editedPost)
            }
            const response = await fetch (`https://localhost:7241/api/Posts/${id}`, options)
            await response.json()
        }
        savePost()
        navigate('/')
    }

    return (
        <Form key={id}>
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
            </FormGroup>  <FormGroup>
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

/* CODE BELOW IS FROM CALEB CURRY FROM ONLINE (YouTube) */
// export const EditPost = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [post, setPost] = useState();
//     const [tempPost, setTempPost] = useState();
//     const [notFound, setNotFound] = useState();
//     const [changed, setChanged] = useState(false);


//     useEffect(() => {
//         console.log('post', post)
//         console.log('tempPost', tempPost)
//     });

//     useEffect(() => {
//         const url = `https://localhost:7241/api/Posts/${id}`;
//         fetch(url)
//         .then((response) => {
//             if (response.status === 404) {
//                 setNotFound(true);
//             }

//             return response.json();
//         })
//         .then((data) => {
//             setPost(data.post);
//             setTempPost(data.post);
//         });
//     }, []);

//     function updatePost() {
//         const url = `https://localhost:7241/api/Posts/${id}`;
//         fetch(url, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(tempPost)
//         }) 
//         .then((response) => {
//             return response.json();
//         })
//         .then((data) => {
//             setPost(data.post)
//             setChanged(false);
//             console.log(data);
//         }).catch();
//     }

//     return (
//         <>
//             {notFound ? <p>The post with id {id} was not found</p> : null}

//             {post ? (
//                 <Form id={tempPost.id}>
//                          <FormGroup>
//                             <Label for="post-title">
//                                  Title
//                              </Label>
//                              <Input
//                                 id="post-title"
//                                 name="post-title"
//                                 placeholder={tempPost.title}
//                                 type="text"
//                                 value={tempPost.title}
//                                 onChange={(e) => {
//                                     setTempPost({
//                                         ...tempPost,
//                                         title: e.target.value, 
//                                     });
//                                 }}
//                             />
//                         </FormGroup>        
//                         <FormGroup>
//                             <Label for="image">
//                                 ImageUrl
//                             </Label>
//                             <Input
//                             id="image"
//                             name="image"
//                             placeholder={tempPost.imageUrl}
//                             type="text"
//                             value={tempPost.imageUrl}
//                             onChange={(e) => {
//                                 setChanged(true);
//                                 setTempPost({
//                                     ...tempPost,
//                                     imageUrl: e.target.value, 
//                                 });
//                                 }}
//                             />
//                         </FormGroup>  
//                         <FormGroup>
//                             <Label for="caption">
//                                 What would you like to say?
//                             </Label>
//                             <Input
//                                 id="caption"
//                                 name="caption"
//                                 type="textarea"
//                                 placeholder={tempPost.caption}
//                                 rows="5"
//                                 cols="10"
//                                 value={tempPost.caption}
//                                 onChange={(e) => {
//                                     setChanged(true);
//                                     setTempPost({
//                                         ...tempPost,
//                                         caption: e.target.value, 
//                                     });
//                                 }}
//                             />
//                         </FormGroup>
//                         {changed ? 
//                         <>
//                             <Button 
//                                 onClick={(e) => {
//                                     setTempPost({...post})
//                                     setChanged(false)
//                                 }}>
//                                     Cancel
//                             </Button>
//                             <Button
//                                 onClick={updatePost}>Save</Button> 
//                         </>
//                         : null}
//                     </Form>
//             ) : null}
//         </>
//     )
// }
    
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