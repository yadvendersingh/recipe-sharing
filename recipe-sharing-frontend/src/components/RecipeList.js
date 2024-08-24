import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'; // Import the shared CSS file

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/recipes/')
            .then(response => {
                setRecipes(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the recipes!", error);
            });
    }, []);

    const goToCreateRecipe = () => {
        navigate('/new-recipe');
    };

    return (
        <div className="container">
            <h1>Recipes</h1>
            <button onClick={goToCreateRecipe}>Create New Recipe</button>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe.id}>
                        <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeList;
