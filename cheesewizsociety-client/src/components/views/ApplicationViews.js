import { Route, Routes, Outlet, useNavigate } from "react-router-dom";
import Home from "../home/Home"
import NavBar from "../nav/NavBar"
import { AllPosts } from "../posts/AllPosts";
import { Recipes } from "../recipes/Recipes";
import { AddPost } from "../posts/AddPost";


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
          <Route path="addNewPost" element={ <AddPost /> } />
          <Route path="recipes" element={ <Recipes /> } />
        
        </Route>
      </Routes>
  );
};