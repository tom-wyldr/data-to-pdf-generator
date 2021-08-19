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
        <h4>Hi {recipe.firstName} </h4>
        <ImageContainer
            imgUrl={recipe.imgUrl}
            portions={recipe.portions}
            name={recipe.type.name}
            time={recipe.grossPrep}
            icon={recipe.type.icon}
        />
        <h3>{recipe.title} </h3>
        <Tip tip={recipe.tip} />
        <NutrientsList nutrients={recipe.nutrients} label={recipe.nutrientsLabel} />
        <IngredientsList ingredients={recipe.ingredients} species={recipe.paos} label={recipe.ingredientsLabel} />
      </LeftItem>
      <RightItem>
        <Instruction steps={recipe.instruction} label={recipe.stepsLabel} />
      </RightItem>
      <FooterLabel>{recipe.recipeFootNote}</FooterLabel>
      <IdLabel>{recipe.printId}</IdLabel>
    </Container>
  );
};

export default RecipeWrapper;
