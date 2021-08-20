type RecipeType = {
  id: string;
  name: string;
  icon: string;
};

type Nutrient = {
  name: string;
  amount: string;
};

type Recipe = {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  imgUrl: string;
  portions: string;
  grossPrep: string;
  netPrepTime: string;
  type: RecipeType;
  ingredients: string[];
  paos: string[];
  instruction: string[];
  printId: string;
  tip: string;
  recipeFootNote: string;
  nutrientsLabel: string;
  stepsLabel: string;
  ingredientsLabel: string;
  nutrients: Nutrient[];
};

export type { Recipe, Nutrient, RecipeType };
