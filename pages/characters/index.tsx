import { API } from "../../assets/api/api";
import {
  CharacterType,
  ResponseType,
} from "../../assets/api/rick-and-morty-api";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { getLayout } from "../../components/Layout/BaseLayout/BaseLayout";
import dynamic from "next/dynamic";

//ленивый импорт
const CharacterCard = dynamic(
  () =>
    import("components/Card/CharacterCard/CharacterCard").then(
      (module) => module.CharacterCard
    ),
  {
    // вот эта компонента генерируется на клиенте
    ssr: false,
    loading: () => <h1>Loading</h1>,
  }
);

export const getStaticProps = async () => {
  const characters = await API.rickAndMorty.getCharacters();

  return {
    props: {
      characters,
    },
    // revalidate если указать ждет указанное время и потом запрашивает новые данные
  };
};

type Props = {
  characters: ResponseType<CharacterType>;
};

const Characters = (props: Props) => {
  const { characters } = props;

  const charactersList = characters.results.map((el) => (
    <CharacterCard key={el.id} character={el} />
  ));
  return <PageWrapper>{charactersList}</PageWrapper>;
};

Characters.getLayout = getLayout;
export default Characters;
