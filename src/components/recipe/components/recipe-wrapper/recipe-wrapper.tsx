// eslint-disable-next-line no-use-before-define
import React, {FC} from "react";
import {Recipe} from "../../../../common/types/recipe/recipe.type";
import { Container, IdLabel, FooterLabel, Item, LeftItem, RightItem } from './styles'
import Tip from "../tip/tip";
import NutrientsList from "../nutrients/nutrients-list";
import IngredientsList from "../ingredients/ingredients-list";
import Instruction from "../instruction/instruction";
import ImageContainer from "../photo-container/photo-container";

type Props = {
  recipe: Recipe;
};

const RecipeWrapper: FC<Props> = ({recipe}) =>  {
  return (
    <Container>
      <LeftItem>
        <h4>Hi {recipe.firstname} </h4>
        <ImageContainer
            imgUrl={recipe.recipe_image_url}
            portions={recipe.portions}
            name={recipe.recipe_category}
            time={recipe.gross_prep_time}
            icon={recipe.recipe_category_image_url}
        />
        <h3>{recipe.recipe_title} </h3>
        <Tip tip={recipe.health_tip} />
        <NutrientsList nutrients={recipe.nutrients} label={recipe.nutrition_title} />
        <IngredientsList ingredients={recipe.ingredients} species={recipe.paos} label={recipe.recipe_ingredient_title} />
      </LeftItem>
      <RightItem>
        <Instruction steps={recipe.instruction} label={recipe.recipe_instruction_title} />
      </RightItem>
      <FooterLabel>{recipe.recipe_foot_note}</FooterLabel>
      <IdLabel>{recipe.print_id}</IdLabel>
    </Container>
  );
};

export default RecipeWrapper;
