export const FetchPosts = async () => {
    const response = await fetch (`/Posts`);
    const postsArray = await response.json();
    return postsArray
}

export const FetchPostsWithComments = async () => {
    const response = await fetch (`/Posts/GetPostsWithComments`);
    const postsArray = await response.json();
    return postsArray
}

export const FetchPostByIdWithComments = async (id) => {
    const response = await fetch (`/Posts/GetPostByIdWithComments/${id}`);
    const post = await response.json();
    return post
}

export const FetchPostById = async (id) => {
    const response = await fetch (`/Posts/${id}`);
    const post = await response.json();
    return post
}

export const AddNewPost = async (newPost) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPost)
    }

    await fetch(`/Posts`, options)
}

export const FetchPostsBySearch = async (criterion) => {
    const response = await fetch(`/Posts/search?q=${criterion}&sortDesc=true`)
    const postsArray = await response.json()
    return postsArray
}

export const FetchCheeses = async () => {
    const response = await fetch(`https://localhost:7241/api/Cheeses`)
    const cheesesArray = await response.json()
    return cheesesArray
}

export const GetRandomCheese = async () => {
    const response = await fetch(`/Cheeses`)
    const cheesesArray = await response.json()
    const randomCheese = cheesesArray[Math.floor(Math.random() * cheesesArray.length)]
    return randomCheese
}

export const FetchRecipes = async () => {
    const response = await fetch (`/Recipes`);

    const postsArray = await response.json();
    return postsArray
}

export const FetchRecipesBySearch = async (criterion) => {
    const response = await fetch(`https://localhost:7241/api/Recipes/search?q=${criterion}&sortDesc=true`)
    const postsArray = await response.json()
    return postsArray
}

export const FetchUsers = async () => {
    const response = await fetch (`https://localhost:7241/api/Users`)
    const usersArray = await response.json()
    return usersArray
}
export const FetchUserByFirebaseUid = async (firebaseUid) => {
    const response = await fetch (`https://localhost:7241/api/Users/${firebaseUid}`);
    const user = await response.json();
    return user
}

