export const Key = ({ note, setKey, pressedKey, clearKey }) => {
    // console.log(pressedKey);
    // console.log(note);
    return (
        <section>
            <div className={`key ${note.length === 2 ? 'flat' : 'natural'}
             ${pressedKey[0] === note ? 'pressed' : ''}`} key={note}
             onMouseDown={() => setKey(note)} onMouseUp={() => clearKey(note)}>
                 {/* onTouchStart={() => setKey(note)} onTouchEnd={() => clearKey(note)} */}
                {note.length === 1 &&
                    <p>
                        {note}
                    </p>}
            </div>
        </section>
    )
}