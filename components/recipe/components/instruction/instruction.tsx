// eslint-disable-next-line no-use-before-define
import React, {FC} from "react";
import { Label, Title } from "./styles";

type Props = {
  steps: string[];
};

const Instruction: FC<Props> = ({steps}) =>  {
  const renderRecipes = steps.map(step => <Label>{step}</Label>);

  return (
    <div>
      <Title>Steps</Title>
      <React.Fragment>
        { renderRecipes }
      </React.Fragment>
    </div>
  );
};

export default Instruction;
