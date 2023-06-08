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
        recipeType: 0,
        ingredients: '',
        instructions: ''
    });

    const [recipe, setRecipes] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipes = async () => {
            const recipesArray = await FetchRecipes()
            setRecipes(recipesArray);
        };
        fetchRecipes();
        console.warn(recipe)
    },
    []);

    const handleSaveButtonClick = (event) => {
        event.preventDefault();

        const dataToSendToAPI = {
            recipeName: newRecipe.recipeName,
            imageUrl: newRecipe.imageUrl,
            recipeType: newRecipe.recipeType.id,
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
                id="recipeTypeSelect"
                name="select"
                type="select"
                >
                <option value="" disabled selected>-- Choose Recipe Type --</option>
                {recipe.recipeType.map((type) => {
                    return (
                        <option className="recipeTypes" key={type.recipeType} value={type.recipeType}>
                            {type.id}
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