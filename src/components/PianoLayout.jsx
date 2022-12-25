import { useContext, useEffect } from 'react'
import AppContext from '../AppContext'
import './PianoLayout.sass'

function PianoLayout({ hideLabel }) {
    const { page } = useContext(AppContext)
    const keys = [
        {audiofile: "../assets/piano-keys/bottom_c.mp3", name: "bottom_c"}
    ]

    useEffect(() => {
        const audioCtx = new AudioContext()
        const audBuffers = {};
        ['c', 'c_sharp', 'd', 'd_sharp', 'e', 'f', 'f_sharp', 'g', 'g_sharp', 'a', 'a_sharp', 'b'].forEach((keyVal) => {
            ['bottom', 'middle', 'high'].forEach(async (octVal) => {
                const file = await fetch(`/src/assets/piano-keys/${octVal}_${keyVal}.mp3`, { credentials: 'same-origin' })
                const data = await file.arrayBuffer()
                const audioBuffer = await audioCtx.decodeAudioData(data)
                audBuffers[`${octVal}_${keyVal}`] = audioBuffer
            })
            })

        const listener = (ev) => {
            const source = audioCtx.createBufferSource()
            source.buffer = audBuffers[ev.target.id]
            source.connect(audioCtx.destination)

            if (page === 'learningArena') {
                source.start(0, 0.5)
            }
        }

        const keyElems = [...document.querySelectorAll('.key, .key-black')]
        keyElems.forEach((el) => {
            el.addEventListener('click', listener)
        })

        return () => {
            keyElems.forEach((el) => {
                el.removeEventListener('click', listener)
            })            
        }
    }, [page])

    return (
        <div className={`piano-layout ${hideLabel ? "label-hidden" : ""}`}>
            <div className="octave" id="bottom-octave">
                <div className="oct-hd" id="b-hd">Bottom</div>
                <div className="keys" id="bottom-keys">
                    <button className="key bt-key" id="bottom_c">C</button>
                    <button className="key-black bt-key-black" id="bottom_c_sharp">C<sup>#</sup></button>
                    <button className="key bt-key" id="bottom_d">D</button>
                    <button className="key-black bt-key-black" id="bottom_d_sharp">D<sup>#</sup></button>
                    <button className="key bt-key" id="bottom_e">E</button>
                    <button className="key bt-key" id="bottom_f">F</button>
                    <button className="key-black bt-key-black" id="bottom_f_sharp">F<sup>#</sup></button>
                    <button className="key bt-key" id="bottom_g">G</button>
                    <button className="key-black bt-key-black" id="bottom_g_sharp">G<sup>#</sup></button>
                    <button className="key bt-key" id="bottom_a">A</button>
                    <button className="key-black bt-key-black" id="bottom_a_sharp">A<sup>#</sup></button>
                    <button className="key bt-key" id="bottom_b">B</button>
                </div>
            </div>
            <div className="octave" id="middle-octave">
                <div className="oct-hd" id="m-hd">Middle</div>
                <div className="keys" id="middle-keys">
                    <button className="key md-key" id="middle_c">C</button>
                    <button className="key-black md-key-black" id="middle_c_sharp">C<sup>#</sup></button>
                    <button className="key md-key" id="middle_d">D</button>
                    <button className="key-black md-key-black" id="middle_d_sharp">D<sup>#</sup></button>
                    <button className="key md-key" id="middle_e">E</button>
                    <button className="key md-key" id="middle_f">F</button>
                    <button className="key-black md-key-black" id="middle_f_sharp">F<sup>#</sup></button>
                    <button className="key md-key" id="middle_g">G</button>
                    <button className="key-black md-key-black" id="middle_g_sharp">G<sup>#</sup></button>
                    <button className="key md-key" id="middle_a">A</button>
                    <button className="key-black md-key-black" id="middle_a_sharp">A<sup>#</sup></button>
                    <button className="key md-key" id="middle_b">B</button>
                </div>
            </div>
            <div className="octave" id="high-octave">
                <div className="oct-hd" id="h-hd">High</div>
                <div className="keys" id="high-keys">
                    <button className="key hg-key" id="high_c">C</button>
                    <button className="key-black hg-key-black" id="high_c_sharp">C<sup>#</sup></button>
                    <button className="key hg-key" id="high_d">D</button>
                    <button className="key-black hg-key-black" id="high_d_sharp">D<sup>#</sup></button>
                    <button className="key hg-key" id="high_e">E</button>
                    <button className="key hg-key" id="high_f">F</button>
                    <button className="key-black hg-key-black" id="high_f_sharp">F<sup>#</sup></button>
                    <button className="key hg-key" id="high_g">G</button>
                    <button className="key-black hg-key-black" id="high_g_sharp">G<sup>#</sup></button>
                    <button className="key hg-key" id="high_a">A</button>
                    <button className="key-black hg-key-black" id="high_a_sharp">A<sup>#</sup></button>
                    <button className="key hg-key" id="high_b">B</button>
                </div>
            </div>
        </div>
    )
}

export default PianoLayout