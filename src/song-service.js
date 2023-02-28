export const songService = {
    loadSongs,
    notes,
    keyNotes
}

function loadSongs() {
    var songs = [
        { name: 'Little star', notes: ['c', 'c', 'g', 'g', 'a', 'a', 'g', '', 'f', 'f', 'e', 'e', 'd', 'd', 'c'], tempo: 600 },
        { name: 'Little johnatan', notes: ['g', 'e', 'e', '', 'f', 'd', 'd', '', 'c', 'd', 'e', 'f', 'g', 'g', 'g'], tempo: 600 },
        { name: 'Little lamb', notes: ['e', 'd', 'c', 'd', 'e', 'e', 'e', '', 'd', 'd', 'd', '', 'e', 'g', 'g', ''], tempo: 600 },
    ]
    return songs
}

function notes() {
    return ['c', 'db', 'd', 'eb', 'e', 'f', 'gb', 'g', 'ab', 'a', 'bb', 'b']
}

function keyNotes() {
    return { 'd': 'c', 'r': 'db', 'f': 'd', 't': 'eb', 'g': 'e', 'h': 'f', 'u': 'gb', 'j': 'g', 'i': 'ab', 'k': 'a', 'o': 'bb', 'l': 'b' }
}