import { useEffect, useRef, useState } from 'react'
import './App.css'
import HomePage from './components/home-page/homePage'
import GamePage from './components/game-page/gamePage'

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

  const updateContentWithScoreBoard = () => {
    if (!main.current)
      return

    setContent('')
  }


  useEffect(() => {
    setContent(
      <HomePage
        goToGamePage={updateContentWithGamePage}
        goToScoreBoard={updateContentWithScoreBoard}
      />
    )
  }, [])


  return (
    <main ref={main}>
      {content}
    </main>
  )
}

export default App
