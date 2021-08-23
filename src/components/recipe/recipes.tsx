// eslint-disable-next-line no-use-before-define
// @ts-ignore
import React from 'react';
import {RecipeWrapper} from './components/components';
import {GlobalStyle} from "./styles";
import {getRecipe, getRecipeFromXLSX,getRecipeFromApi} from "../../helpers/helpers";

function Recipes() {
  //const data = getRecipe();
  const data = getRecipeFromXLSX();
  //const data = getRecipeFromApi();
  const renderRecipes = data.map((recipe) => (
    <RecipeWrapper recipe={recipe}/>
  ));

  return (
    <>
      <GlobalStyle />
      <React.Fragment>
        {renderRecipes}
      </React.Fragment>
    </>
  );
};

export default Recipes;
