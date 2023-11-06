import useClimaContext from "../context/ClimaProvider";
import Form from "./Form"
import Loading from "./Loading";
import Result from "./Result"

const AppWeather = () => {
    const {spinner, result, noResult} = useClimaContext();

  return (
    <>
    <header>
        <h1>Buscador de clima</h1>
    </header>
      <main className="dos-columnas">
        <Form />
        {spinner ? <Loading/> : noResult? (<p> No hay resultados </p>) : result?.name && <Result/> }
      </main>
    </>
  )
}

export default AppWeather
