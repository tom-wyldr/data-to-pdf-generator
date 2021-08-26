'use strict';
import {Recipe} from "../../common/types/types";
import recipeDB from "../../../database.json"
import os from "os";
const excelToJson = require('convert-excel-to-json');
const path = require('path');
const fs = require('fs');

const getRecipe = (
): Recipe[] | null => {
  // @ts-ignore
  return recipeDB;
};

const getRecipeFromXLSX = (): Recipe[] => {
  const spreadsheet = excelToJson({
    sourceFile: 'D:\\IdeaProjects\\data-to-pdf-generator\\test.xlsx'
  });
  console.log('XLSX is converted');
  const recipesList = spreadsheet.figma_recipes.filter(it => it.S !== '/hide').slice(1);
  return getRecipesList(recipesList);
}

const getRecipeFromApi = (): Recipe[] => {
  const spreadsheet = excelToJson({
    sourceFile: os.tmpdir()+'\\xlsxFigmaRecipeFile.xlsx'
  });
  console.log('XLSX is converted');
  const recipesList = spreadsheet.figma_recipes.filter(it => it.S !== '/hide').slice(1);
  return getRecipesList(recipesList);
}

const getRecipeFromApiJSON = (): Recipe[] => {
  const jsonPath = path.join(__dirname, '../../../DB.json');
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  return getRecipesListFromDB(data);
}

//todo: just use data base data without mapping
const getRecipesListFromDB = (list):Recipe[] => {
  return list.map(it => {
    return {
      "id": it.recipe_id,
      "firstName": it.firstname,
      "lastName": it.lastname,
      "title": it.recipe_title,
      "imgUrl": it.recipe_image_url,
      "portions": it.portions,
      "grossPrep": it.gross_prep_time,
      "netPrepTime": it.net_prep_time,
      "type": {
        "id": "1",
        "name": it.recipe_category,
        "icon": it.recipe_category_image_url
      },
      "ingredients": it.ingredients,
      "paos": it.paos,
      "instruction": it.instruction,
      "printId": it.print_id,
      "tip": it.health_tip,
      "recipeFootNote": it.recipe_foot_note,
      "nutrientsLabel": it.nutrition_title,
      "stepsLabel": it.recipe_instruction_title,
      "ingredientsLabel": it.recipe_ingredient_title,
      "nutrients": [
        {
          "name": it.energy_title,
          "amount": it.energy_value
        },
        {
          "name": it.protein_title,
          "amount": it.protein_value
        },
        {
          "name": it.fat_title,
          "amount": it.fat_value
        },
        {
          "name": it.satfat_title,
          "amount": it.satfat_value
        },
        {
          "name": it.unsatfat_title,
          "amount": it.unsatfat_value
        },
        {
          "name": it.carbs_title,
          "amount": it.carbs_value
        },
        {
          "name": it.fibers_title,
          "amount": it.fibers_value
        },
        {
          "name": it.sugar_title,
          "amount": it.sugar_value
        },
        {
          "name": it.salt_title,
          "amount": it.salt_value
        },
      ]
    }
  });
}

const getRecipesList = (list):Recipe[] => {
  return list.map(it => {
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
}

export { getRecipe, getRecipeFromXLSX, getRecipeFromApi, getRecipeFromApiJSON };
