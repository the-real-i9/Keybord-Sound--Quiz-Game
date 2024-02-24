import { useContext } from 'react'
import AppContext from '../AppContext'
import './HomePage.sass'

function HomePage() {
    const { setPage } = useContext(AppContext)

  return (
    <div className="home-page-view">
        <div className="header">
            <div className="decoration dec-left">
                <span className="outer-circle">
                    <span className="middle-circle">
                        <span className="inner-circle"></span>
                    </span>
                </span>
            </div>
            <div className="logo">
                <span>McKenney's Sound Guessing Game</span>
            </div>
            <div className="decoration dec-left">
                <span className="inner-circle"></span>
                <span className="middle-circle"></span>
                <span className="outer-circle"></span>
            </div>
        </div>
        <div className="instructions">
            <div className="title">Instructions</div>
            <ul className="ins-list">
                <li className="ins-item">
                    <b className="ins-hd">Learning Arena</b>
                    <p>You're presented with the Keyboard UI. Take your time to play, practice and memorize the keys
                        you're playing.</p>
                    <button onClick={() => setPage('learningArena')} className="learn-btn">Start Learning <span className="goto-icon"><svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12"/><polyline points="88 160 120 128 88 96" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12"/><polyline points="144 160 176 128 144 96" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12"/></svg></span></button>
                </li>
                <li className="ins-item">
                    <b className="ins-hd">Training Arena</b>
                    <p>Ok! So, now that you've learned. Buckle up! It's time for some training!</p>
                    <button onClick={() => setPage('trainingArena')} className="train-btn">Start Training <span className="goto-icon"><svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><circle cx="128" cy="128" r="96" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><polyline points="88 160 120 128 88 96" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><polyline points="144 160 176 128 144 96" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /></svg></span></button>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default HomePage