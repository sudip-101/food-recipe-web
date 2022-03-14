import React, { useEffect, useState } from "react";
import Recipe from "./recipe";
import Header from "./header";
import "./App.css";
import axios from "axios";
import Loader from "./Loader";

const App = () => {
  const APP_ID = "e67af003";
  const APP_KEY = "cec10aed796957cfa07abda75963a6ce";

  // const exampleReq = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    axios
      .get(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      )
      .then((response) => {
        console.log(response);
        setLoading(false);
        setRecipes(response.data.hits);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, [query]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
      <Header />
      <form onSubmit={getSearch} className="search-form">
        <h2>Your favourite recipe here</h2>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            value={search}
            onChange={updateSearch}
          />
          <button className="search-btn">search</button>
        </div>
      </form>
      <div className="recipe-container">
        {loading ? (
          <Loader />
        ) : (
          recipes.map((recipe) => (
            <Recipe
              key={recipe.recipe.label}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
            />
          ))
        )}
        {error ? <p>Can't load. Try again...</p> : null}
      </div>
    </div>
  );
};

export default App;
