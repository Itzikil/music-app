import { Key } from "./key"
import React from "react"
import { songService } from "../song-service"

class Piano extends React.Component {
    state = {
        songs: songService.loadSongs(),
        pressedKey: [],
        soundPlayer: null,
        notes: songService.notes(),
        keyNotes: songService.keyNotes(),
    }

    componentDidMount() {
        window.addEventListener('keydown', this.setKey)
        window.addEventListener('keyup', this.clearKey)
    }

    setKey = (ev, autoPlay) => {
        if (ev.code && ev.repeat) return
        let key = ev.key ? this.state.keyNotes[ev.key] : ev
        if (!key) return
        if (this.state.pressedKey.includes(key) && !autoPlay) return
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
            }
        }
    }

    autoPlay = (note, tempo) => {
        if (!note) return
        const pressedKey = [...this.state.pressedKey]
        pressedKey.push(note)
        this.setState({ pressedKey })
        this.playNote(note)
        setTimeout(() => {
            let index = this.state.pressedKey?.indexOf(note)
            pressedKey.splice(index, 1)
            this.setState({ pressedKey })
        }, tempo / 2)
    }

    playSong = (notes, tempo) => {
        notes.map((note, i) => {
            setTimeout(() => {
                this.autoPlay(note, tempo)
                // console.log(this.state.pressedKey)
            }, (i + 1) * tempo)
        })
    }

    playNote = (key) => {
        this.state.soundPlayer = new Audio(`./${key}.mp3`)
        this.state.soundPlayer.play()
    }

    render() {
        const { notes, pressedKey, songs } = this.state
        return (
            <section>
                <h1>Piano</h1>
                {/* <button onClick={() => console.log(pressedKey)}>click</button> */}
                <div className="songs-container">
                    {songs.map(({ notes, tempo, name }) =>
                        <button key={name} onClick={() => this.playSong(notes, tempo)}>{name}</button>
                    )}
                </div>
                <div className="piano">
                    {notes.map((note, i) => <section key={note + i}>
                        <Key note={note} key={note} setKey={this.setKey} pressedKey={pressedKey} clearKey={this.clearKey} />
                        <audio key={i} src={`./${note}.mp3`}></audio>
                    </section>
                    )}
                </div>
            </section>
        )
    }
}

export { Piano }