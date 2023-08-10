import { useEffect, useRef, useState } from 'react'
import './App.css'
import HomePage from './components/home-page/homePage'
import GamePage from './components/game-paeg/gamePage'

function App() {
  
  const main = useRef(null)
  const [content, setContent] = useState()

  
  const updateContentWithHomePage = () => {
    if (!main.current)
      return
    
      setContent(<HomePage goToGamePage={updateContentWithGamePage} />)
  }
  const updateContentWithGamePage = (playerName) => {
    if (!main.current)
      return

    setContent(<GamePage playerName={playerName} goToHomePage={updateContentWithHomePage} />)
  }


  useEffect(() => {
    setContent(<HomePage goToGamePage={updateContentWithGamePage} />)
  }, [])
  

  return (
    <main ref={main}>
      {content}
    </main>
  )
}

export default App
