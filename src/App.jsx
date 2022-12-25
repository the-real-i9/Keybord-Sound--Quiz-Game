import { useEffect, useState } from 'react'
import HomePage from './components/HomePage'
import './App.sass'
import AppContext from './AppContext'
import LearningArena from './components/LearningArena'
import TrainingArena from './components/TrainingArena'

function App() {
  const [page, setPage] = useState('home')

  return (
    <AppContext.Provider value={{ page, setPage }}>
      <div className="app-wrapper">
        {page === 'home' ? <HomePage /> : page === 'learningArena' ? <LearningArena /> : page === 'trainingArena' ? <TrainingArena /> : null}
      </div>
    </AppContext.Provider>
  )
}

export default App
