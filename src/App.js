import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Recipe from './recipe';
import Header from './header';


const App = () => {
  
  const APP_ID = "e67af003";
  const APP_KEY = "cec10aed796957cfa07abda75963a6ce";

  // const exampleReq = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`;
  
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('chicken');

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch (
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  return(
    <div className="App">
      <Header />
      <form onSubmit={getSearch} className="search-form">
        <h2>Your favourite recipe here</h2>
        <div className="search-box">
          <input type="text" className="search-bar" value={search} onChange={updateSearch}/>
          <button className="search-btn">search</button>
        </div>
      </form>
      <div className="recipe-container">
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};


export default App;
