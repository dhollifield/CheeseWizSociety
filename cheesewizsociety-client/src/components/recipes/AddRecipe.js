import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FetchRecipes } from "../APIManager";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import "./Recipes.css";

export const AddRecipe = () => {
    const currentUser = localStorage.getItem("user")
    const cheeseUserObject = JSON.parse(currentUser)

    const [newRecipe, update] = useState({
        recipeName: '',
        imageUrl: '',
        recipeTypeId: 0,
        recipeType: null,
        ingredients: '',
        instructions: ''
    });

    const [recipes, setRecipes] = useState([])

    const [recipeTypes, setRecipeTypes] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipes = async () => {
            const recipesArray = await FetchRecipes()
            setRecipes(recipesArray);
        };
        fetchRecipes();
    },
    []);

    useEffect(
        () => {
            const fetchRecipeTypes = async () => {
                const response = await fetch("https://localhost:7241/api/RecipeTypes/")
                const recipeTypes = await response.json()
                setRecipeTypes(recipeTypes)
            }
            fetchRecipeTypes()
        }, []);

    const handleSaveButtonClick = (event) => {
        event.preventDefault();

        const dataToSendToAPI = {
            recipeName: newRecipe.recipeName,
            imageUrl: newRecipe.imageUrl,
            recipeTypeId: newRecipe.recipeTypeId,
            ingredients: newRecipe.ingredients,
            instructions: newRecipe.instructions,
            userId: cheeseUserObject.Id
        };

        return fetch(`https://localhost:7241/api/Recipes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSendToAPI)
        })
            .then((response) => response.json())
            .then(() => {
                navigate('/Recipes');
            });
    }

    return (
        <Form key={newRecipe.userId}>
            <FormGroup>
                <Label for="RecipeName">
                    Recipe Name
                </Label>
                <Input
                    id="recipeName"
                    name="recipeName"
                    placeholder="Recipe Name"
                    type="text"
                    value={newRecipe.recipeName}
                    onChange={(e) => {
                        const copy = { ...newRecipe };
                        copy.recipeName = e.target.value;
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
                value={newRecipe.imageUrl}
                    onChange={(e) => {
                        const copy = { ...newRecipe };
                        copy.imageUrl = e.target.value;
                        update(copy)
                    }}
                />
            </FormGroup>
            <FormGroup>
                <Label for="recipeTypeSelect">
                Select Recipe Type
                </Label>
                <Input
                    id="type-select"
                    name="select"
                    type="select"
                    className="recipe-type-select-dropdown"
                    value={newRecipe.recipeTypeId}
                    onChange={(e) => {
                        const copy = { ...newRecipe };
                        copy.recipeTypeId = e.target.value;
                        update(copy)
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
                    value={newRecipe.ingredients}
                    onChange={(e) => {
                        const copy = { ...newRecipe };
                        copy.ingredients = e.target.value;
                        update(copy)
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
                    value={newRecipe.instructions}
                    onChange={(e) => {
                        const copy = { ...newRecipe };
                        copy.instructions = e.target.value;
                        update(copy)
                    }}
                />
            </FormGroup>
            <Button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>
                Submit Recipe
            </Button>
        </Form>
    )
}