import { Route, Routes, Outlet } from "react-router-dom";
import Home from "../home/Home"
import NavBar from "../nav/NavBar"
import { AllPosts } from "../posts/AllPosts";
import { Recipes } from "../recipes/Recipes";
import { AddPost } from "../posts/AddPost";
import { EditPost } from "../posts/EditPost";
import { UserProfile } from "../user/UserProfile";
import { AddRecipe } from "../recipes/AddRecipe";
import { PostCard } from "../posts/PostCard";


export const ApplicationViews = () => {

  return (
      <Routes>
        <Route path="/" element={
          <>
            <NavBar />
              <Outlet />
          </>
        }>

          <Route path="/" element={ <Home /> } />
          <Route path="posts" element={ < AllPosts /> } />
          <Route path="posts/:id" element={ <PostCard />} />
          <Route path="addNewPost" element={ <AddPost /> } />
          <Route path="editPost/:id" element={ <EditPost /> } />
          <Route path="users/:id" element={<UserProfile /> }/>
          <Route path="recipes" element={ <Recipes /> } />
          <Route path="addNewRecipe" element={ <AddRecipe /> } />
        
        </Route>
      </Routes>
  );
};