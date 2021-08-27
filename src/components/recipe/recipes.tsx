// eslint-disable-next-line no-use-before-define
// @ts-ignore
import React from 'react';
import {RecipeWrapper} from './components/components';
import {GlobalStyle} from "./styles";
import {getRecipes} from "../../helpers/helpers";

function Recipes() {
  const data = getRecipes();
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
}

export default Recipes;
