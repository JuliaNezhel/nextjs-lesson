import {API} from "../../assets/api/api";
import {CharacterType, ResponseType} from "../../assets/api/rick-and-morty-api";
import {PageWrapper} from "../../components/PageWrapper/PageWrapper";
import {Header} from "../../components/Header/Header";
import Image from "next/image";

// вызывается next на сервере
export const getStaticProps = async () => {
    const characters = await API.rickAndMorty.getCharacters()

    return {
        props: {
            characters
        }
    }
}

type Props = {
    characters: ResponseType<CharacterType>
}

const Characters = (props: Props) => {
    const {characters} = props

    const charactersList = characters.results.map(el => (
        <div key={el.id}>
            {el.name}
        </div>
    ))
    return <PageWrapper>
        <Header/>
        {charactersList}
    </PageWrapper>
}

export default Characters
