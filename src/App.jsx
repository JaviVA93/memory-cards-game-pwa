import HomePage from './components/home-page/homePage'
import GamePage from './components/game-page/gamePage'
import ScoreboardPage from './components/scoreboard-page/ScoreboardPage'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <main>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/game' element={<GamePage />} />
        <Route path='/score-board' element={<ScoreboardPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </main>
  )
}

export default App
