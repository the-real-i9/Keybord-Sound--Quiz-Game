import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import './TrainingArena.sass'
import PianoLayout from './PianoLayout'
import AppContext from '../AppContext'

function TrainingArena() {
    const { setPage, audBuffers } = useContext(AppContext)

    const [notesCountValue, setNotesCountValue] = useState(1)
    const [countdownTimeValue, setCountDownTimeValue] = useState(10)
    const [gameStart, setGameStart] = useState(false)
    const [hideLabel, setHideLabel] = useState(false)

    const [countdown, setCountdown] = useState(null)

    const randKeys = useRef([])

    const [oneKey, setOneKey] = useState('')
    const [comboKeys, setComboKeys] = useState([])
    const [remark, setRemark] = useState('')
    const [correctStreak, setCorrectStreak] = useState(0)

    /*  */

    useEffect(() => {
        const cntdwn = setInterval(() => {
            if (gameStart) {
                setCountdown((prev) => prev - 1)
            }
        }, 1000)

        return () => {
            clearInterval(cntdwn)
        }
    }, [gameStart])

    useEffect(() => {
        const audioCtx = new AudioContext()
        const playKey_s = () => {
            if (randKeys.current.length) {
                // since we can have multiple keys play the combination one after the other
                // we use a recursive function to loop through the randKeys array
                let i = 0
                const playKey = () => {
                    const source = audioCtx.createBufferSource()
                    source.buffer = audBuffers[randKeys.current[i]]
                    source.connect(audioCtx.destination)

                    // meanwhile if we're yet to arrive at the last key, we won't complete the time of a key before we end it
                    // but if it's the last key in the interval, let it play till the end
                    // this makes it feel like a natural interval played
                    if (i === notesCountValue - 1) {
                        source.start(0, 0.5) // play till the end
                    } else {
                        source.start(0, 0.5, 0.7) // play up till 0.7s
                    }

                    // we listen for the an end event on one key, then we call the function again for the next key
                    // if we are on the last key, we rollover to the first key, and call the function for it
                    source.onended = () => {
                        if (notesCountValue === i + 1) {
                            i = 0
                            return
                        }
                        i++
                        playKey()
                    }
                }
                playKey()
            }
        }
        playKey_s()
        /*  */
        const repeatRandKey = setInterval(() => {
            playKey_s()
        }, 1500 * notesCountValue)

        return () => {
            clearInterval(repeatRandKey)
        }
    }, [randKeys.current])

    const playRandKey = () => {
        const keys = [...Object.keys(audBuffers)]
        // select a random key
        const rks = []
        for (let i = 0; i < notesCountValue; i++) {
            rks.push(keys[Math.trunc(Math.random() * keys.length)])
        }
        // set the random key into randKey.current
        randKeys.current = rks

    }

    const handlePianoKeyPress = (ev) => {
        if (!gameStart) return
        const keys = [...Object.keys(audBuffers)]
        if (keys.includes(ev.target.id)) {
            if (notesCountValue === 1) {
                setOneKey(ev.target.id)
                if (randKeys.current[0] === ev.target.id) {
                    setRemark('green')
                    // increase correct streak
                    setCorrectStreak((prev) => prev + 1)

                    setTimeout(() => {
                        setOneKey('')
                        setRemark('')
                        // restart time
                        setCountdown(countdownTimeValue * notesCountValue)
                        // the key matches, execute the next random key
                        playRandKey()
                    }, 1000)
                } else {
                    setRemark('red')
                    setCorrectStreak(0)
                    // send a wrong remark
                }
            } else if (notesCountValue > 1) {
                setComboKeys((prev) => {
                    if (randKeys.current.length === prev.length) {
                        const newComboKeys = [ev.target.id]
                        setRemark('')
                        return newComboKeys
                    } else {
                        const upComboKeys = [...prev, ev.target.id]
                        if (randKeys.current.length === upComboKeys.length) {
                            if (randKeys.current.toString() === upComboKeys.toString()) {
                                setRemark('green')
                                // increase correct streak
                                setCorrectStreak((prev) => prev + 1)

                                setTimeout(() => {
                                    setComboKeys([])
                                    setRemark('')
                                    // restart time
                                    setCountdown(countdownTimeValue * notesCountValue)
                                    // the key matches, execute the next random key
                                    playRandKey()
                                }, 1000)
                            } else {
                                setRemark('red')
                                setCorrectStreak(0)
                                // send a wrong remark
                            }
                        }
                        return upComboKeys
                    }
                })

            }
        }
    }


    const stopGame = () => {
        setGameStart(false)
        randKeys.current = []
        setOneKey('')
        setComboKeys([])
        setRemark('')
    }

    const startGame = () => {
        if (countdownTimeValue < 2 || countdownTimeValue > 10 || /\D/.test(countdownTimeValue) || notesCountValue < 1 || notesCountValue > 5 || /\D/.test(notesCountValue)) return
        setGameStart(() => {
            setCountdown(countdownTimeValue * notesCountValue)
            return true
        })
        playRandKey()
    }

    useEffect(() => {
        if (countdown === 0) stopGame()
    }, [countdown])

    const gameSwitch = () => {
        if (gameStart) {
            stopGame()
            setCountdown(null)
        } else {
            startGame()
        }
    }


    return (
        <div className="training-arena-view">
            <h1 className="page-name">Training Arena</h1>
            <div className="intro"><strong>Listen</strong> to the note(s) played, then press its key. If <strong>RED</strong>, you're <strong>wrong</strong>, but if <strong>GREEN</strong>, you're <strong>right</strong>. Good luck!</div>
            <div className="controls">
                <div className="notes-count">
                    <span>Note Counts:</span>
                    <input disabled={gameStart} type="number" max="5" min="1" value={notesCountValue} onChange={(ev) => setNotesCountValue(ev.target.value, 1, 5)} />
                </div>
                <div className="countdown-time">
                    <span>Countdown Time<sub>(sec. for each)</sub>:</span>
                    <input disabled={gameStart} type="number" max="10" min="2" value={countdownTimeValue} onChange={(ev) => setCountDownTimeValue(ev.target.value)} />
                </div>
                <div className="hide-label">
                    <span>Hide Label:</span>
                    <input type="checkbox" checked={hideLabel} onChange={(ev) => setHideLabel(ev.target.checked)} />
                </div>
                <button onClick={gameSwitch}>{gameStart ? "Stop" : countdown === 0 ? "Try again" : "Start"} <span className="goto-icon"><svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><circle cx="128" cy="128" r="96" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><polyline points="88 160 120 128 88 96" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><polyline points="144 160 176 128 144 96" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /></svg></span></button>
            </div>
            <div className="referee_userchv">
                <div className="referee-timing">
                    {countdown === 0 ? <p className="timesup">Time's Up</p> : null}
                    {countdown !== 0 ? <Fragment>
                        <p><strong>Instructor:</strong> Press the key of the note playing in</p>
                        <div className="countdown">{!gameStart ? "..." : `${countdown}s`}</div>
                    </Fragment> : null}
                </div>
                <div className="correct-streak">
                    Streak:
                    <div className='correct-streak-count'>{correctStreak}</div>
                </div>
                <div className="user-choice-validation">
                    User Choice:
                    <div className='user-choice-val'>
                        {oneKey ? <div style={{ color: remark }}>{document.getElementById(oneKey).textContent}</div> : null}
                        {comboKeys.length ? <div style={{ color: remark }}>{comboKeys.map((v) => document.getElementById(v).textContent).join("-")}</div> : null}
                    </div>
                </div>

            </div>
            <div onClick={handlePianoKeyPress} className="piano-layout_wrapper">
                <PianoLayout hideLabel={hideLabel} />
            </div>
            <div className="goto-learn">
                <button onClick={() => setPage('learningArena')} className="learn-btn">Back to Learning <span className="goto-icon"><svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><circle cx="128" cy="128" r="96" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><polyline points="88 160 120 128 88 96" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><polyline points="144 160 176 128 144 96" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /></svg></span></button>
            </div>
        </div>
    )
}

export default TrainingArena