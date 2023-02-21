import { Key } from "./key"
import React from "react"

class Piano extends React.Component {
    state = {
        pressedKey: [],
        soundPlayer: null,
        notes: ['c', 'db', 'd', 'eb', 'e', 'f', 'gb', 'g', 'ab', 'a', 'bb', 'b'],
        keyNotes: { 'd': 'c', 'r': 'db', 'f': 'd', 't': 'eb', 'g': 'e', 'h': 'f', 'u': 'gb', 'j': 'g', 'i': 'ab', 'k': 'a', 'o': 'bb', 'l': 'b' }
    }
    componentDidMount() {
        window.addEventListener('keydown', this.setKey)
        window.addEventListener('keyup', this.clearKey)
    }
    setKey = (ev) => {
        if (ev.code && ev.repeat) return
        let key = ev.key ? this.state.keyNotes[ev.key] : ev
        if (!key) return
        if (this.state.pressedKey.includes(key)) return
        else {
            const pressedKey = [...this.state.pressedKey]
            pressedKey.push(key)
            this.setState({ pressedKey })
        }
        this.playNote(key)
    }

    clearKey = (ev) => {
        let key = ev.key ? this.state.keyNotes[ev.key] : ev
        if (!key) return console.log('not a key');
        if (this.state.pressedKey.length) {
            let index = this.state.pressedKey?.indexOf(key)
            if (index > -1) {
                const pressedKey = [...this.state.pressedKey]
                pressedKey.splice(index, 1)
                this.setState({ pressedKey })
                // usePressedKey(list)
                // setTimeout(() => {
                //     soundPlayer.pause();
                //     soundPlayer.currentTime = 0;
                // },1000)
            }
        }
    }

    playNote = (key) => {
        this.state.soundPlayer = new Audio(`/${key}.mp3`)
        this.state.soundPlayer.play()
    }

    render() {
        const { notes, pressedKey } = this.state
        return (
            <section>
                <h1>Piano</h1>
                {/* <button onClick={() => console.log(pressedKey)}>click</button> */}
                <div className="piano">
                    {notes.map((note, i) => <section key={note + i}>
                        <Key note={note} key={note} setKey={this.setKey} pressedKey={pressedKey} clearKey={this.clearKey} />
                        <audio key={i} src={`/${note}.mp3`}></audio>
                    </section>
                    )}
                </div>
            </section>
        )
    }
}

export { Piano }