import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RecipeForm.css';  // Import the CSS file

const RecipeForm = () => {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const recipeData = {
            title: title,
            ingredients: ingredients,
            instructions: instructions,
        };

        axios.post('http://localhost:8000/api/recipes/', recipeData)
            .then(response => {
                console.log(response.data);
                setTitle('');
                setIngredients('');
                setInstructions('');
                navigate('/'); // Redirect to the home page after submission
            })
            .catch(error => {
                console.error('There was an error submitting the recipe!', error);
            });
    };

    const goToHome = () => {
        navigate('/');
    };

    return (
        <div className="form-container">
            <h2>Submit a New Recipe</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Ingredients:</label>
                    <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)}></textarea>
                </div>
                <div className="form-group">
                    <label>Instructions:</label>
                    <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)}></textarea>
                </div>
                <button type="submit">Submit Recipe</button>
            </form>
            <button className="home-button" onClick={goToHome}>Home</button>
        </div>
    );
};

export default RecipeForm;
