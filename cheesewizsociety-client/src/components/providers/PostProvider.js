import React, { useState } from "react";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
    const [post, setPosts] = useState([]);

    const getAllPosts = () => {
        return fetch('Posts')
            .then((res) => res.json())
            .then(setPosts);
    }; 
    
    const getAllPostsWithComments = async () => {
        return fetch(`Posts/GetPostsWithComments`)
            .then((res) => res.json())
            .then(setPosts);
    };

    const getPostsBySearch = async (criterion) => {
        return fetch(`Posts/search?q=${criterion}&sortDesc=true`)
            .then((res) => res.json())
            .then(setPosts);
    };

    const AddPost = async (newPost) => {
        return fetch(`Posts`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post)
        });
    };

    return (
        <PostContext.Provider value={{ post, getAllPosts, getAllPostsWithComments, getPostsBySearch, AddPost }}>
            {props.children}
        </PostContext.Provider>
    )
};
