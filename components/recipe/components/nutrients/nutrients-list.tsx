// eslint-disable-next-line no-use-before-define
import React, {FC} from "react";
import {Container, Item, Name, Value} from './styles'
import {Nutrient} from "../../../../common/types/recipe/recipe.type";

type Props = {
  nutrients: Nutrient[];
  label: string;
};

const NutrientsList: FC<Props> = ({nutrients, label}) => {

  const renderNutrients = nutrients.map((it) =>
    (
      <Item>
        <Name>{it.name}</Name>
        <Value>{it.amount}</Value>
      </Item>
    )
  );

  return (
    <div>
      <h3>{label}</h3>
      <Container>
        <React.Fragment>
          {renderNutrients}
        </React.Fragment>
      </Container>
    </div>
  );
};

export default NutrientsList;
