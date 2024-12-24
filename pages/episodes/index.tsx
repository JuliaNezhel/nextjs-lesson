import { API } from "../../assets/api/api";
import { EpisodeType, ResponseType } from "../../assets/api/rick-and-morty-api";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { Card } from "../../components/Card/Card";
import { getLayout } from "../../components/Layout/BaseLayout/BaseLayout";
import { GetServerSideProps } from "next";

// вызывается на сервере в момент билда
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  //что бы сильно не пинговать сервер, есть кешироапние
  res.setHeader(
    "Cache-Control",
    "publix, s-maxage=10, stale-while-revalidate=100"
  );
  const episodes = await API.rickAndMorty.getEpisodes();
  const isAuth = true;

  if (!episodes) {
    return {
      // функци некста
      notFound: true,
    };
  }

  if (!isAuth) {
    return {
      redirect: {
        destination: "/test",
        permanent: false,
      },
    };
  }

  return {
    props: {
      episodes,
    },
  };
};

type Props = {
  episodes: ResponseType<EpisodeType>;
};

const Episodes = (props: Props) => {
  const { episodes } = props;

  const episodesList = episodes?.results.map((el) => (
    <Card key={el.id} name={el.name} />
  ));
  return <PageWrapper>{episodesList}</PageWrapper>;
};

Episodes.getLayout = getLayout;
export default Episodes;
