import { CharacterStatusType } from "assets/api/rick-and-morty-api";
import Image, { StaticImageData } from "next/image";

type PropsType = {
  status: CharacterStatusType;
  src: StaticImageData;
};
// если задать атрибут fill картинка будет занимать всю ширину родителя
export const Status = (props: PropsType) => {
  const { src, status } = props;
  return (
    <>
      <Image src={src} alt="ff" width={14} height={15} />
    </>
  );
};
