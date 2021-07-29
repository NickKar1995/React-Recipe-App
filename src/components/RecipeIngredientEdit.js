import React from 'react'
import Ingredient from './Ingredient'

export default function RecipeIngredientEdit(props) {
    const {ingredient,handleIngredientChange,handleIngredientDelete}=props

    let handleChange = (changes)=>{
        handleIngredientChange(ingredient.id,{...ingredient,...changes})
    }
    return (
        <>
            <input onChange={(e)=>handleChange({name:e.target.value })} value = {ingredient.name} className = 'recipe-edit__input'type='text' />
            <input onChange={(e)=>handleChange({amount:e.target.value })} value = {ingredient.amount}className = 'recipe-edit__input' type='text' />
            <button onClick =  {()=>handleIngredientDelete(ingredient.id)}className='btn btn-danger'>&times;</button>

            
        </>
    )
}
