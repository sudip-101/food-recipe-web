import React from 'react';
import './recipe.css';

const Recipe = ({title, calories, image, ingredients}) => {

    return(
        <div className="recipe-box">
            <h1>{title}</h1>
            <ol>
                {ingredients.map(ingredient => (
                    <li>{ingredient.text}</li>
                ))}
            </ol>
            <div className="content">
                <p><span>Calories - </span>{calories}</p>
                <img src={image} alt="" />
            </div>
        </div>
    );
};

export default Recipe;