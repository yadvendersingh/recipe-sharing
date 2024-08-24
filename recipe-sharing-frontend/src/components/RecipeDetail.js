import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css'; // Import the shared CSS file

const RecipeDetail = () => {
    const { id } = useParams(); // Get the recipe ID from the URL
    const [recipe, setRecipe] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/recipes/${id}/`)
            .then(response => {
                setRecipe(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the recipe!", error);
            });
    }, [id]);

    const goToHome = () => {
        navigate('/');
    };

    if (!recipe) return <div>Loading...</div>;

    return (
        <div className="container">
            <h1>{recipe.title}</h1>
            <p><strong>Ingredients:</strong></p>
            <p>{recipe.ingredients}</p>
            <p><strong>Instructions:</strong></p>
            <p>{recipe.instructions}</p>
            <button className="home-button" onClick={goToHome}>Home</button>
        </div>
    );
};

export default RecipeDetail;
