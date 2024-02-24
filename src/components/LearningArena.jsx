import { useContext } from 'react'
import AppContext from '../AppContext'
import './LearningArena.sass'
import PianoLayout from './PianoLayout'

function LearningArena() {
    const { setPage } = useContext(AppContext)

    return (
        <div className="learning-arena-view">
            <h1 className="page-name">Learning Arena</h1>
            <div className="intro"><strong>Play</strong> the keys and <strong>Memorize</strong> the sounds. <br /> Then proceed to training when you've got a little confidence. Take your time!</div>
            <div className="piano-layout_wrapper">
                <PianoLayout />
            </div>
            <div className="goto-train">
            <button onClick={() => setPage('trainingArena')} className="train-btn">Start Training <span className="goto-icon"><svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><circle cx="128" cy="128" r="96" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><polyline points="88 160 120 128 88 96" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><polyline points="144 160 176 128 144 96" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /></svg></span></button>
            </div>
        </div>
    )
}

export default LearningArena