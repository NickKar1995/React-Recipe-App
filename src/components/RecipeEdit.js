import React,{useContext} from "react";
import RecipeIngredienEdit from "./RecipeIngredientEdit";
import {RecipeContext} from './App'
const { v4: uuidv4 } = require("uuid");


export default function RecipeEdit({recipe}) {

  const {handleRecipeChange,handleRecipeSelect}= useContext(RecipeContext)

  let handleChange=(changes)=>{
    handleRecipeChange(recipe.id,{...recipe,...changes})

  }

  let handleIngredientChange=(id,ingredient)=>{
    const newIngredients = [...recipe.ingredients]
    const index = newIngredients.findIndex(i=>i.id===id)
    newIngredients[index]=ingredient
    handleChange({ingredients:newIngredients})

  }

  let handleIngredientAdd=()=>{
    const newIngredient = {
      id:uuidv4(),
      name:'',
      amount:'',
    }
    handleChange({ingredients:[...recipe.ingredients,newIngredient]})
  }

  let handleIngredientDelete = (id)=>{
    handleChange({ingredients:recipe.ingredients.filter(i=>i.id===id)})
  }


  return (
    <div className="recipe-edit">
      <div className='recipe-edit__remove-button-container'>
        <button 
        onClick={()=>handleRecipeSelect(undefined)}
        className='btn recipe-edit__remove-button'>&times;</button>
      </div>
      <div className='recipe-edit__details-grid'>
        <label 
        className = 'recipe-edit__label' 
        htmlFor="name">Name</label>
        <input  onInput = {e=>handleChange({name:e.target.value})} value = {recipe.name} className = 'recipe-edit__input'type="text" name="name" id="name" />
        <label 
        className='recipe-edit__label' 
        htmlFor="cookTime">Cook Time</label>
        <input   onInput = {e=>handleChange({cookTime:e.target.value})} value = {recipe.cookTime} className = 'recipe-edit__input' type="text" name="cookTime" id="cookTime" />
        <label 
        className='recipe-edit__label' 
         htmlFor="servings">Servings</label>
        <input onInput = {e=>handleChange({servings:parseInt(e.target.value)|| ''})} value = {recipe.servings} className = 'recipe-edit__input' type="number" min="1" name="servings" id="servings" />
        <label 
        className='recipe-edit__label'  
        htmlFor="instructions">Instructions</label>
        <textarea 
          onInput = {e=>handleChange({instructions:e.target.value})}
          value = {recipe.instructions}
          className='recipe-edit__input'
          name="instructions"
          id="instructions"
          cols="30"
          rows="10"
        ></textarea>
      </div>
      <br />
      <label className='recipe-edit__label'>Ingredients</label>
      <div className='recipe-edit__ingredient-grid'>
        <div>Name</div>
        <div>Amount</div>
        <div></div>

        {/* ingredients Components */}
        {recipe.ingredients.map(ingredient=>{
          return(
          <RecipeIngredienEdit 
          handleIngredientDelete={handleIngredientDelete}
          handleIngredientChange={handleIngredientChange}
          key = {ingredient.id}
          ingredient={ingredient}/>)
        })}
        
      </div>
      <div className='recipe-edit__add-ingredient-btn-container'>
        <button 
        onClick={()=>handleIngredientAdd()}
        className='btn btn-primary'>Add Ingredient</button>
      </div>
    </div>
  );
}
