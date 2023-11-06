import { createContext, useContext, useState } from "react";
import { getLatLon, getWeather } from "../helpers/api_helper";

const ClimaContext = createContext();

export default function useClimaContext () {
    return useContext(ClimaContext);
}

export const ClimaProvider = ({children}) => {
    const [search, setSearch] = useState({
        city: '',
        country: ''
    });
    const [result, setResult] = useState({});
    const [spinner, setSpinner] = useState(false)
    const [noResult, setNoResult] = useState(false);


    const handleSearchChanges = e => {
        const {name, value} = e.target; 
        console.log(name, value)
        setSearch(prevState => ({
            ...prevState, 
            [name] : value
        }))
    }

    const findWeather = async () => {
        setSpinner(true);
        try {
            const [{lat, lon}] = await getLatLon(search.city, search.country);
            const data = await getWeather(lat, lon);
            setResult(data);
            setNoResult(false);
        } catch (err) {
            console.error(err);
            setNoResult(true);
        }
        finally {
            setSpinner(false);

        }
    } 

    return (
        <ClimaContext.Provider value={{
            search, 
            handleSearchChanges,
            findWeather,
            result,
            spinner,
            noResult
        }}>
            {children}
        </ClimaContext.Provider>
    )
}