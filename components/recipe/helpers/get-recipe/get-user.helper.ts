'use strict';
import {Recipe} from "../../../../common/types/types";
import recipeDB from "../../../../database.json"
const excelToJson = require('convert-excel-to-json');

const getRecipe = (
): Recipe[] | null => {
  // @ts-ignore
  return recipeDB;
};

const getRecipeFromXLSX = (): Recipe[] => {
  const spreadsheet = excelToJson({
    sourceFile: 'D:\\IdeaProjects\\data-to-pdf-generator\\test.xlsx'
  });
  const recipesList = spreadsheet.figma_recipes.filter(it => it.S !== '/hide').slice(1);
  const res = recipesList.map(it => {
    return {
      "id": it.A,
      "firstName": it.C,
      "lastName": it.D,
      "title": it.E,
      "imgUrl": it.F,
      "portions": it.G,
      "grossPrep": it.H,
      "netPrepTime": it.I,
      "type": {
        "id": "1",
        "name": it.J,
        "icon": it.K
      },
      "ingredients": it.L.split("\n"),
      "paos": it.M.split("\n"),
      "instruction": it.N.split("\n\n"),
      "printId": it.R,
      "tip": it.T,
      "recipeFootNote": it.O,
      "nutrientsLabel": it.AN,
      "stepsLabel": it.Q,
      "ingredientsLabel": it.P,
      "nutrients": [
        {
          "name": it.U,
          "amount": it.AF
        },
        {
          "name": it.AC,
          "amount": it.AH
        },
        {
          "name": it.AB,
          "amount": it.AI
        },
        {
          "name": it.AA,
          "amount": it.AJ
        },
        {
          "name": it.V,
          "amount": it.AK
        },
        {
          "name": it.W,
          "amount": it.AL
        },
        {
          "name": it.Z,
          "amount": it.AM
        },
        {
          "name": it.Y,
          "amount": it.AD
        },
        {
          "name": it.X,
          "amount": it.AE
        },
      ]
    }
  });
  return res;
}

export { getRecipe, getRecipeFromXLSX };
