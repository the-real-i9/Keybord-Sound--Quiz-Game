import { useEffect, useRef, useState } from 'react'
import HomePage from './components/HomePage'
import './App.sass'
import AppContext from './AppContext'
import LearningArena from './components/LearningArena'
import TrainingArena from './components/TrainingArena'

function App() {
  const [page, setPage] = useState('home')
  const audBuffers = useRef({})
  
  useEffect(() => {
    const audioCtx = new AudioContext();

    ['bottom', 'middle', 'high'].forEach(async (octVal) => {
      (octVal === 'bottom' ? ['f', 'f_sharp', 'g', 'g_sharp', 'a', 'a_sharp', 'b'] 
      : octVal === 'middle' ? ['c', 'c_sharp', 'd', 'd_sharp', 'e', 'f', 'f_sharp', 'g', 'g_sharp', 'a', 'a_sharp', 'b'] 
      : ['c', 'c_sharp', 'd', 'd_sharp', 'e']).forEach(async (keyVal) => {
        const file = await fetch(`/src/assets/piano-keys/${octVal}_${keyVal}.mp3`)
        const data = await file.arrayBuffer()
        const audioBuffer = await audioCtx.decodeAudioData(data)
        audBuffers.current[`${octVal}_${keyVal}`] = audioBuffer
      })
    })

    /* ['c', 'c_sharp', 'd', 'd_sharp', 'e', 'f', 'f_sharp', 'g', 'g_sharp', 'a', 'a_sharp', 'b'].forEach((keyVal) => {
      ['bottom', 'middle', 'high'].forEach(async (octVal) => {
        const file = await fetch(`/src/assets/piano-keys/${octVal}_${keyVal}.mp3`)
        const data = await file.arrayBuffer()
        const audioBuffer = await audioCtx.decodeAudioData(data)
        audBuffers.current[`${octVal}_${keyVal}`] = audioBuffer
      })
    }) */
  }, [])

  return (
    <AppContext.Provider value={{ page, setPage, audBuffers: audBuffers.current }}>
      <div className="app-wrapper">
        {page === 'home' ? <HomePage /> : page === 'learningArena' ? <LearningArena /> : page === 'trainingArena' ? <TrainingArena /> : null}
      </div>
    </AppContext.Provider>
  )
}

export default App
