// eslint-disable-next-line no-use-before-define
import React, {FC} from "react";
import { Container, Info, Image, Icon } from "./styles"

type Props = {
  imgUrl: string;
  name: string;
  icon: string;
  portions: string;
  time: string;
};

const ImageContainer: FC<Props> = ({imgUrl, name, icon, portions, time}) =>  {
  return (
    <Container>
      <Image src={imgUrl} alt={"dish"} />
      <Info>
         <Icon src={icon} alt={"icon_portions"} />
         <span>{portions}</span>
         <Icon src={icon} alt={"icon_time"} />
         <span>{time}</span>
         <Icon src={icon} alt={"icon_type"} />
         <span>{name}</span>
      </Info>
    </Container>
  );
};

export default ImageContainer;
