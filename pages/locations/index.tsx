import {PageWrapper} from "../../components/PageWrapper/PageWrapper";
import {Header} from "../../components/Header/Header";
import {dehydrate, useQuery} from "@tanstack/react-query";
import {LocationType, ResponseType} from "../../assets/api/rick-and-morty-api";
import {QueryClient} from "@tanstack/query-core";


// type Props = {
//     characters: ResponseType<CharacterType>
// }

const getLocations = () => {
    return fetch('https://rickandmortyapi.com/api/location', {
        method: "GET"
    }).then(res => res.json())
}

export const getStaticProps = async () => {
    const queryClient = new QueryClient()
    await queryClient.fetchQuery(['locations'], getLocations)

    return {
        props: {
            dehydrateState: dehydrate(queryClient)
        }
    }
}

const Locations = () => {
    const {data: locations} = useQuery<ResponseType<LocationType>>(['locations'], getLocations)

    if (!locations) return null

    const locationsList = locations?.results.map(el => (
        <div key={el.id}>
            {el.name}
        </div>
    ))
    return <PageWrapper>
        <Header/>
        {locationsList}
    </PageWrapper>
}

export default Locations
