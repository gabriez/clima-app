import { useEffect, useState } from "react"
import { getCountries } from "../helpers/api_helper"
import useClimaContext from "../context/ClimaProvider";
const Form = () => {
    const {search, handleSearchChanges, findWeather} = useClimaContext();
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState(false);
    useEffect(() => {
        const fetchCountries = async () => {
            const countriesFetch = await getCountries();

            setCountries([...countriesFetch])
        }

        fetchCountries();
    },[])

    const handleSubmit = e => {
        e.preventDefault();

        if (Object.values(search).includes('')){ 
            setError(true);
            return ;
        }
        setError(false);
        findWeather()
    }

  return (
    <div className="contenedor">
        {error ? (<p> Ningún campo puede estar vacío </p>) : ''}
        <form onSubmit={handleSubmit}>
            <div className="campo">
                <label htmlFor="ciudad">Ciudad</label>
                <input type="text" name="city" id="ciudad" value={search.city} onChange={handleSearchChanges} />
            </div>
            <div className="campo">
                <label htmlFor="pais">Ciudad</label>
                <select name="country" id="pais" value={search.code} onChange={handleSearchChanges} > 
                    <option value="">Seleccione un país</option>
                    {countries.map(item=> (<option key={item.code} value={item.code}> {item.countryName} </option>))}
                </select>
            </div>
            <input type="submit" value="Consultar" />
        </form>
    </div>
  )
}

export default Form
