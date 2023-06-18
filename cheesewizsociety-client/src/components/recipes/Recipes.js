import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {FetchRecipes, FetchRecipesBySearch} from "../APIManager";
import {
    CardGroup,
    Card,
    CardBody,
    CardTitle,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./Recipes.css";

export const Recipes = () => {
    const [recipes, setRecipes] = useState([])
    const {searchCriterion} = useParams()

    const fetchRecipes = async () => {
        const recipesArray = await FetchRecipes()
        setRecipes(recipesArray)
    }

    const fetchRecipesBySearch = async () => {
        const recipesArray = await FetchRecipesBySearch(searchCriterion)
        setRecipes(recipesArray)
    }

    useEffect (() => {
        if (searchCriterion) {
            fetchRecipesBySearch()
        } else {
            fetchRecipes()
        }
    }, [])

    return (
        <>
        <h1 className="recipe-page-title"> - RECIPES - </h1>
        <div className="add-recipe-button">
            <Link to={`/addNewRecipe`} className="add-new-recipe-link">
                <button className="add-new-recipe-button">ADD A RECIPE</button>
            </Link>
        </div>
        {/* <div className="input-group rounded">
            <input type="search" className="form-control rounded" placeholder="Search Recipes" aria-label="Search" aria-describedby="search-addon" />
            <span className="input-group-text border-0" id="search-addon">
                <i className="fas fa-search">{searchCriterion}</i>
            </span>
        </div> */}
        <div className="recipe-card-container">
        <CardGroup>
            {recipes.map((recipe) => {
                return (
                <>
                <Card
                className="recipe-preview-card"
                style={{
                    width: '25rem'
                }}
                >
                <a href={`/Recipes/${recipe.id}`}>
                    <img
                        className="recipe-preview-image"
                        alt="Card"
                        src={recipe.imageUrl}
                        width="300"
                        height="300"
                    />
                </a>
                <CardBody>
                    <CardTitle tag="h4">
                        {recipe.recipeName}
                    </CardTitle>
                    <CardTitle tag="h6">
                        {recipe.recipeType.recipeType}
                    </CardTitle>
                </CardBody>
                </Card>
                </>
                )
            })}
        </CardGroup>
        </div>
        </>
    )
}