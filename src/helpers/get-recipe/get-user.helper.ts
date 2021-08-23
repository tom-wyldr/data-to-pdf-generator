'use strict';
import {Recipe} from "../../common/types/types";
import recipeDB from "../../../database.json"
import os from "os";
var fs = require('fs');
var path = require('path');
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
  return getRecipesList(recipesList);
}

const getRecipeFromApi = (): Recipe[] => {
  const res = getMostRecent(os.tmpdir() + '\\recipeApp\\in\\');
  const spreadsheet = excelToJson({
    // @ts-ignore
    sourceFile: os.tmpdir() + `\\recipeApp\\in\\${res.name}`
  });
  // @ts-ignore
  fs.unlinkSync(os.tmpdir() + `\\recipeApp\\in\\${res.name}`);
  const recipesList = spreadsheet.figma_recipes.filter(it => it.S !== '/hide').slice(1);
  return getRecipesList(recipesList);
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

const getMostRecent = (_dir): string => {
  const dir = path.resolve(_dir);
  let res = null;
  const files = fs.readdirSync(dir);
  if (files) {
    res = {name: files[0], time: fs.statSync(path.resolve(dir, files[0])).mtime.getTime()};
    for (let i = 1; i < files.length; ++i) {
      const filepath = path.resolve(dir, files[i]);
      const time = fs.statSync(filepath).mtime.getTime();
      if (time < res.time) {
        res = {name: files[i], time: time};
      }
    }
  }
  if (res !== null) {
    return res;
  } else {
    return 'No files found';
  }
};

export { getRecipe, getRecipeFromXLSX, getRecipeFromApi, getMostRecent };
