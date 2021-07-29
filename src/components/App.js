import React, { useState,useEffect } from "react";
import "../css/app.css";
import RecipeList from "./RecipeList";
import RecipeEdit from "./RecipeEdit";
// import {uuidv4} from 'uuid/v4';
const { v4: uuidv4 } = require("uuid");




export const RecipeContext = React.createContext();
const LOCAL_STORAGE_KEY = 'Recipe-app.recipes'



function App() {
  const [selectedRecipeId,setSelectedRecipeId] = useState()
  const [recipes, setRecipes] = useState(sampleRecipes);
  const selectedRecipe = recipes.find(recipe=>recipe.id===selectedRecipeId)
  // console.log(selectedRecipe)



  useEffect(()=>{
    const recipeJSON=localStorage.getItem(LOCAL_STORAGE_KEY)
    if(recipeJSON!=null){
      setRecipes(JSON.parse(recipeJSON))
    }
  },[])


  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(recipes))
  },[recipes])

  
  
  let handleRecipeAdd = () => {
    const newRecipe = {
      id: uuidv4(),
      name: "",
      servings: 1,
      cookTime: "",
      instructions: "",
      ingredients: [{ id: uuidv4(), name: "Name", amount: "" }],
    };

    setSelectedRecipeId(newRecipe.id)
    setRecipes([...recipes, newRecipe]); 
  };

  let handleRecipeDelete=(id)=>{
    if (selectedRecipeId!==null && selectedRecipeId===id){
      setSelectedRecipeId(undefined)
    }
    setRecipes(recipes.filter(recipe=>{return recipe.id!==id}))
  }


  //here is that one
  let handleRecipeSelect=(id)=>{
    setSelectedRecipeId(id);
  }

  //20 

  let handleRecipeChange=(id,recipe)=>{
    const newRecipes=[...recipes]
    const index = newRecipes.findIndex(r=>r.id===id)
    newRecipes[index]=recipe
    setRecipes(newRecipes)
  }
  
const recipeContextValue={
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange,
  }



  


  return (
  <RecipeContext.Provider value = {recipeContextValue}>
  <RecipeList recipes={recipes} />
  {selectedRecipe&&<RecipeEdit recipe={selectedRecipe}/>}
  </RecipeContext.Provider>
  );
}

const sampleRecipes = [
  {
    id: 1,
    name: "Plain Chicked",
    servings: 3,
    cookTime: "1:45",
    instructions: "1.Put some things \n2. Put something else\n3. Eat",
    ingredients: [
      {
        id: 1,
        name: "Chicken",
        amount: "2 pounds",
      },
      {
        id: 2,
        name: "Salt",
        amount: "1 Tbs",
      },
    ],
  },
  {
    id: 2,
    name: "Plain Pork",
    servings: 5,
    cookTime: "0:45",
    instructions: "1.Put some things\n2.Put something else\n3.Eat that pork",
    ingredients: [
      {
        id: 1,
        name: "Pork",
        amount: "4 pounds",
      },
      {
        id: 2,
        name: "Paprika",
        amount: "1 Tbs",
      },
    ],
  },
];

export default App;
