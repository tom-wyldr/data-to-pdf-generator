// eslint-disable-next-line no-use-before-define
// @ts-ignore
import React, {FC} from "react";
import { Container, Ava, Card, Label, Sign } from './styles'
// import {Avatar} from '@material-ui/core';

type Props = {
  tip: string;
};

/*
<Ava>
          <Avatar src="https://static.dw.com/image/18372292_303.jpg"/>
        </Ava>
 */

const Tip: FC<Props> = ({tip}) => {
  return (
    <Container>
      <Card>
        <Label>{tip}</Label>
      </Card>
      <Sign>
          <span>Steffi, Ernährungswissenschaftlerin</span>
      </Sign>
    </Container>
  );
};

export default Tip;
