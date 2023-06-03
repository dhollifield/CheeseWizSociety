import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {FetchRecipes, FetchRecipesBySearch} from "../APIManager";
import {
    CardGroup,
    Card,
    CardBody,
    CardLink,
    CardTitle,
    CardText,
    ListGroup,
    ListGroupItem
} from "reactstrap";

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
    })

    return (
        <>
        <div className="input-group rounded">
            <input type="search" className="form-control rounded" placeholder="Search Recipes" aria-label="Search" aria-describedby="search-addon" />
            <span className="input-group-text border-0" id="search-addon">
                <i className="fas fa-search">{searchCriterion}</i>
            </span>
        </div>
        <CardGroup>
            {recipes.map((recipe) => {
                return (
                <>
                <Card
                style={{
                    width: '18rem'
                }}
                >
                <img
                    alt="Card"
                    src={recipe.imageUrl}
                />
                <CardBody>
                    <CardTitle tag="h5">
                        {recipe.recipeName}
                    </CardTitle>
                    <CardTitle tag="h6">
                        {recipe.recipeType.recipeType}
                    </CardTitle>
                    <CardText>
                        {recipe.ingredients}
                    </CardText>
                    <CardText>
                        {recipe.instructions}
                    </CardText>
                    Posted by:  
                    <CardLink href="#">
                        {recipe.user.userName}
                    </CardLink>
                </CardBody>
                </Card>
                </>
                )
            })}
        </CardGroup>
        </>
    )
}