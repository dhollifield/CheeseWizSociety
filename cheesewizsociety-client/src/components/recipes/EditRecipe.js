import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import "./Recipes.css";

export const EditRecipe = () => {
    const currentUser = localStorage.getItem("user")
    const cheeseUserObject = JSON.parse(currentUser)

    const [editedRecipe, setEditedRecipe] = useState({
        recipeName: '',
        imageUrl: '',
        recipeTypeId: 0,
        ingredients: '',
        instructions: '',
        user: null
    });

    const [recipeTypes, setRecipeTypes] = useState([])
    
    const { recipeId } = useParams();
    const navigate = useNavigate();

    useEffect(
        () => {
            const fetchRecipeById = async (recipeId) => {
                const response = await fetch(`https://localhost:7241/api/Recipes/${recipeId}`)
                const recipe = await response.json()
                setEditedRecipe(recipe)
              }
              fetchRecipeById(recipeId)
            }, []);
    
    useEffect(
        () => {
            const fetchRecipeTypes = async () => {
                const response = await fetch("https://localhost:7241/api/RecipeTypes/")
                const recipeTypes = await response.json()
                setRecipeTypes(recipeTypes)
            }
            fetchRecipeTypes()
        }, []);

    const handleSaveButtonClick = (e) => {
        e.preventDefault();
        
        const saveRecipe = async () => {
            editedRecipe.user = null;
            const options = {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editedRecipe)
            } 
            await fetch (`https://localhost:7241/api/Recipes/${recipeId}`, options)
            
        }
        saveRecipe(recipeId);
        navigate(`/Recipes`)
    }

    return (
        <Form key={editedRecipe.id}>
            <FormGroup>
                <Label for="recipe-title">
                    Recipe Name
                </Label>
                <Input
                    id="recipe-title"
                    name="recipe-title"
                    placeholder="What is the name of your recipe?"
                    type="text"
                    value={editedRecipe.recipeName}
                    onChange={(e) => {
                        const copy = { ...editedRecipe };
                        copy.recipeName = e.target.value;
                        setEditedRecipe(copy)
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
                value={editedRecipe.imageUrl}
                    onChange={(e) => {
                        const copy = { ...editedRecipe };
                        copy.imageUrl = e.target.value;
                        setEditedRecipe(copy)
                    }}
                />
            </FormGroup>
            <FormGroup>
                <Label for="recipe-type-select-label">
                    Select Recipe Category
                </Label>
                <Input
                    id="type-select"
                    name="select"
                    type="select"
                    className="recipe-type-select-dropdown"
                    value={editedRecipe.recipeTypeId}
                    onChange={(e) => {
                        const copy = { ...editedRecipe };
                        copy.recipeTypeId = e.target.value;
                        setEditedRecipe(copy)
                    }}
                >
                <option value="" disabled selected>-- Choose --</option>
                    {recipeTypes.map((option) => {
                        return (
                            <option className="recipe-type" key={option.id} value={option.id}>
                                {option.recipeType}
                            </option>
                        )
                    })}
                </Input>
            </FormGroup>  
            <FormGroup>
                <Label for="ingredients">
                    Ingredients
                </Label>
                <Input
                    id="ingredients"
                    name="ingredients"
                    type="textarea"
                    rows="5"
                    cols="10"
                    value={editedRecipe.ingredients}
                    onChange={(e) => {
                        const copy = { ...editedRecipe };
                        copy.ingredients = e.target.value;
                        setEditedRecipe(copy)
                    }}
                />
            </FormGroup>
            <FormGroup>
                <Label for="instructions">
                    Instructions
                </Label>
                <Input
                    id="instructions"
                    name="instructions"
                    type="textarea"
                    rows="5"
                    cols="10"
                    value={editedRecipe.instructions}
                    onChange={(e) => {
                        const copy = { ...editedRecipe };
                        copy.instructions = e.target.value;
                        setEditedRecipe(copy)
                    }}
                />
            </FormGroup>
            <Button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>
                Save Recipe
            </Button>
        </Form>
    )
}
    