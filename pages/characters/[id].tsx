import { API } from "assets/api/api";
import { CharacterType } from "assets/api/rick-and-morty-api";
import { PageWrapper } from "components/PageWrapper/PageWrapper";
import { CharacterCard } from "components/Card/CharacterCard/CharacterCard";
import { getLayout } from "components/Layout/BaseLayout/BaseLayout";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import styled from "styled-components";

export const getStaticPaths: GetStaticPaths = async () => {
  const { results } = await API.rickAndMorty.getCharacters();

  const paths = results.map((charcter) => ({
    params: { id: String(charcter.id) },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

// вызывается next на сервере каждыый раз как запрашиваете страницу
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params || {};
  const character = await API.rickAndMorty.getCharacter(id as string);
  if (!character) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      character,
    },
  };
};

type PropsType = {
  character: CharacterType;
};

const Character = (props: PropsType) => {
  const { character } = props;

  const router = useRouter();

  if (router.isFallback) return <h1>loading...</h1>;

  const characterId = router.query.id;

  const goToCharacter = () => {
    router.push("/characters");
  };

  return (
    <PageWrapper>
      <Container>
        <IdText>Id: {characterId}</IdText>
        <CharacterCard key={character.id} character={character} />
        <Button onClick={goToCharacter}>GO TO Characters</Button>
      </Container>
    </PageWrapper>
  );
};

Character.getLayout = getLayout;
export default Character;

const Button = styled.button`
  width: 338px;
  height: 60px;
  border-radius: 4px;
  border: none;
  background-color: pink;

  &:hover {
    opacity: 0.8;
  }
`;

const IdText = styled.div`
  font-size: 38px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;
