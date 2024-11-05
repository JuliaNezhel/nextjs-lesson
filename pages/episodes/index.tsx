import {API} from "../../assets/api/api";
import {EpisodeType, ResponseType} from "../../assets/api/rick-and-morty-api";
import {PageWrapper} from "../../components/PageWrapper/PageWrapper";
import {Header} from "../../components/Header/Header";
import Image from "next/image";

// вызывается на сервере в момент билда
export const getServerSideProps = async () => {
    const episodes = await API.rickAndMorty.getEpisodes()

    if (!episodes) {
        return {
            // функци некста
            notFound: true
        }
    }

    return {
        props: {
            episodes
        }
    }
}

type Props = {
    episodes: ResponseType<EpisodeType>
}

const Episodes = (props: Props) => {
    const {episodes} = props

    const episodesList = episodes?.results.map(el => (
        <div key={el.id}>
            {el.name}
        </div>
    ))
    return <PageWrapper>
        <Header/>
        {episodesList}
    </PageWrapper>
}

export default Episodes
