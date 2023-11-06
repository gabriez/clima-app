import { useState } from 'react'
import AppWeather from './components/AppWeather'
import { ClimaProvider } from './context/ClimaProvider'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ClimaProvider>
      <AppWeather/>
    </ClimaProvider>
  )
}

export default App
