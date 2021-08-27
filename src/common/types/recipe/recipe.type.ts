type Nutrient = {
  name: string;
  amount: string;
};

type Recipe = {
  recipe_id: string;
  firstname: string;
  lastname: string;
  recipe_title: string;
  recipe_image_url: string;
  portions: string;
  gross_prep_time: string;
  net_prep_time: string;
  recipe_category: string;
  recipe_category_image_url: string;
  ingredients: string[];
  paos: string[];
  instruction: string[];
  print_id: string;
  health_tip: string;
  recipe_foot_note: string;
  nutrition_title: string;
  recipe_instruction_title: string;
  recipe_ingredient_title: string;
  nutrients: Nutrient[];
};

export type { Recipe, Nutrient };
