import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardLink,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import "./Recipes.css";

export const RecipeCard = () => {
  const [recipe, setRecipe] = useState({
    recipeName: " ",
    imageUrl: " ",
    recipeType: {
        id: 0,
        recipeType: " ",
    },
    ingredients: " ",
    instructions: " ",
    user: {
        id: 0,
        userName: " ",
    }
  });

  const { recipeId } = useParams();
  
  const currentUser = localStorage.getItem("user")
  const cheeseUserObject = JSON.parse(currentUser)  
  
  const navigate = useNavigate();
    
    useEffect(() => {
      const fetchRecipe = async () => {
        const response = await fetch (`https://localhost:7241/api/Recipes/${recipeId}`)
        const recipe = await response.json()
        setRecipe(recipe)
      } 
      fetchRecipe()
    }, [recipeId])

  const editButton = () => {
            return (
              <Link to={`/editRecipe/${recipeId}`}>
                <button className="edit-recipe-button">
                  Edit Recipe
                </button>                                       
              </Link>
            );
        };
    
  const deleteButton = () => {
      const deleteRecipe = async () => {
      const options = {
        method: "DELETE",
      };
      await fetch(`https://localhost:7241/api/Recipes/${recipeId}`, options);
    };
    deleteRecipe().then(() => navigate(`/Recipes`))
  };
        
        return (
          <>
          <CardLink className="back-button">
            <Button 
                color="dark"
                size="lg"
                className="profile-back-button"
                href={`/Recipes`}>Back to Recipes</Button>
        </CardLink>
          <Card key={recipe.id}
            className="recipe-card"
          >
            <img alt="Card" src={recipe.imageUrl} />
            <CardBody>
              <CardTitle tag="h4">{recipe.recipeName}</CardTitle>
              <CardTitle tag="h6">Ingredients</CardTitle>
              <CardText>{recipe.ingredients}</CardText>
              <CardTitle tag="h6">Instructions</CardTitle>
              <CardText>{recipe.instructions}</CardText>
              Posted by:
              <CardLink href={`/Users/${recipe.user.id}`}>
                {recipe.user.userName}
              </CardLink>
            </CardBody>
            <div className="recipe-buttons">
              {cheeseUserObject.Id === recipe.user.id ? (
                <>
                    <>{editButton(recipe.id)}</>
        
                  <button
                    className="delete-recipe-button"
                    onClick={() => deleteButton(recipe.id)}
                  >
                    Delete Recipe
                  </button>
                </>
              ) : (
                <></>
              )}
            </div>
          </Card>
          </>
        );
      }