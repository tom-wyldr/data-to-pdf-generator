'use strict';
import {Recipe} from "../../common/types/types";
import os from "os";
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');

const getRecipeFromApi = (): Recipe[] => {
  const spreadsheet = excelToJson({
    sourceFile: os.tmpdir()+'/xlsxFigmaRecipeFile.xlsx'
  });
  const recipesList = spreadsheet.figma_recipes.filter(it => it.S !== '/hide').slice(1);
  return getRecipesList(recipesList);
}

const getRecipeFromApiJSON = (): Recipe[] => {
  const json = fs.readFileSync(os.tmpdir()+'/DB.json', 'utf-8');
  return getRecipesListFromDB(JSON.parse(json));
}

const getRecipesListFromDB = (list):Recipe[] => {
  return list.map(it => {
    return {
      "recipe_id": it.recipe_id,
      "firstname": it.firstname,
      "lastname": it.lastname,
      "recipe_title": it.recipe_title,
      "recipe_image_url": it.recipe_image_url,
      "portions": it.portions,
      "gross_prep_time": it.gross_prep_time,
      "net_prep_time": it.net_prep_time,
      "recipe_category": it.recipe_category,
      "recipe_category_image_url": it.recipe_category_image_url,
      "ingredients": it.ingredients,
      "paos": it.paos,
      "instruction": it.instruction,
      "print_id": it.print_id,
      "health_tip": it.health_tip,
      "recipe_foot_note": it.recipe_foot_note,
      "nutrition_title": it.nutrition_title,
      "recipe_instruction_title": it.recipe_instruction_title,
      "recipe_ingredient_title": it.recipe_ingredient_title,
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
      "recipe_id": it.A,
      "firstname": it.C,
      "lastname": it.D,
      "recipe_title": it.E,
      "recipe_image_url": it.F,
      "portions": it.G,
      "gross_prep_time": it.H,
      "net_prep_time": it.I,
      "recipe_category": it.J,
      "recipe_category_image_url": it.K,
      "ingredients": it.L.split("\n"),
      "paos": it.M.split("\n"),
      "instruction": it.N.split("\n\n"),
      "print_id": it.R,
      "health_tip": it.T,
      "recipe_foot_note": it.O,
      "nutrition_title": it.AN,
      "recipe_instruction_title": it.Q,
      "recipe_ingredient_title": it.P,
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

export { getRecipeFromApi, getRecipeFromApiJSON };
