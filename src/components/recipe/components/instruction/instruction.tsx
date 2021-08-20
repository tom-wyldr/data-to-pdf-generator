// eslint-disable-next-line no-use-before-define
import React, {FC} from "react";
import { Label, Title } from "./styles";

type Props = {
  steps: string[];
  label: string;
};

const Instruction: FC<Props> = ({steps, label}) =>  {
  const renderRecipes = steps.map(step => <Label>{step}</Label>);

  return (
    <div>
      <Title>{label}</Title>
      <React.Fragment>
        { renderRecipes }
      </React.Fragment>
    </div>
  );
};

export default Instruction;
