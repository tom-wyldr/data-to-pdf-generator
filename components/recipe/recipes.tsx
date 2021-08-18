// eslint-disable-next-line no-use-before-define
// @ts-ignore
import React from 'react';
import {CertificateWrapper} from './components/components';
import {getRecipe, getRecipeFromXLSX} from "./helpers/helpers";
import {GlobalStyle} from "./styles";

function Recipes() {
  const data = getRecipe();
  //const dataFromXlsx = getRecipeFromXLSX();

  const renderRecipes = data.map((recipe) => (
    <CertificateWrapper recipe={recipe}/>
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
