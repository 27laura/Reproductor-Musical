const songList = [
    {
        title: "El tri-Pobre soñador",
        file: "pobre soñador.mp3",
        cover: "tri.jpg"

    },
    {
        title: "Mana-Mariposa traicionera",
        file: "Mariposa Traicionera .mp3",
        cover: "mana.jpg"
    },
    {
        title: "Vilma Palma-Bye Bye",
        file: "Bye Bye.mp3",
        cover: "vilma.jpg"
    },
    {
        title: "Enrique Bunbury-Aunque no sea conmigo",
        file: "Aunque no sea conmigo.mp3",
        cover: "enrique.jpg"
    },
    {
        title: "Soda stereo-Cuando pase el temblor",
        file: "Cuando pase el temblor.mp3",
        cover: "sodastereo.jpg"
    },
    {
        title: "Duncan Dhu-En algun lugarr",
        file: "En Algún Lugar .mp3",
        cover: "duncant.jpg"
    },
    {
        title: "Jaguares-Te lo pido por favor",
        file: "te Lo Pido.mp3",
        cover: "jaguares.jpg"
    },
    {
        title: "Kabah-La calle de las sirenas",
        file: "La Calle de las Sirenas .mp3",
        cover: "kabah.jpg"
    },
    {
        title: "Caifanes-La celula que explota",
        file: "La célula que explota .mp3",
        cover: "caifanes.jpg"
    },
    {
        title: "Heroes del silencio-La chispa adecuaada",
        file: "La chispa Adecuada .mp3",
        cover: "heroes.jpg"
    },
    {
        title: "Magneto-Vuela Vuela",
        file: "vuela vuela.mp3",
        cover: "magneto.jpg"
    },
    {
        title: "Enanitos verdes-La muralla verde",
        file: "La Muralla Verde.mp3",
        cover: "verdes.jpg"
    },
    {
        title: "OV7-Shabadaba",
        file: "Shabadaba.mp3",
        cover: "ov.png"
    },
    {
        title: "Hombres G- Un par de palabras",
        file: "un par de palabras.mp3",
        cover: "hombresg.jpg"
    },
    {
        title: "Veni Vidi Vici-Viviendo de noche",
        file: "viviendo de noche.mp3",
        cover: "veni.jpg"
    },

]

let actualSong = null


const songs = document.getElementById("songs")
const audio = document.getElementById("audio")
const cover = document.getElementById("cover")
const title = document.getElementById("title")
const play = document.getElementById("play")
const prev = document.getElementById("prev")
const next = document.getElementById("next")
const progress = document.getElementById("progress")
const progressContainer = document.getElementById("progress-container")
progressContainer.addEventListener("click", setProgress)


audio.addEventListener("timeupdate", updateProgress)


play.addEventListener("click", () => {
    if (audio.paused) {
        playSong()   
    } else {
        pauseSong()
    }
})

next.addEventListener("click", () => nextSong())
prev.addEventListener("click", () => prevSong())


function loadSongs() {
    songList.forEach((song, index) => {
       
        const li = document.createElement("li")
        const link = document.createElement("a")
        link.textContent = song.title
        link.href = "#"
        link.addEventListener("click", () => loadSong(index))
        li.appendChild(link)
        songs.appendChild(li)
    })
}
function loadSong(songIndex) {
    if (songIndex !== actualSong) {
        changeActiveClass(actualSong, songIndex)
        actualSong = songIndex
        audio.src = "./audio/" + songList[songIndex].file
        playSong()
        changeSongtitle(songIndex)
        changeCover(songIndex)
    }
}
function updateProgress(event) {
    const {duration, currentTime} = event.srcElement
    const percent = (currentTime / duration) * 100
    progress.style.width = percent + "%" 
}
function setProgress(event) {
    const totalWidth = this.offsetWidth
    const progressWidth = event.offsetX
    const current = (progressWidth / totalWidth) * audio.duration
    audio.currentTime = current
}
function updateControls() {
    if (audio.paused) {
        play.classList.remove("fa-pause")
        play.classList.add("fa-play")
    } else {
        play.classList.add("fa-pause")
        play.classList.remove("fa-play")
    }
}
function playSong() {
    if (actualSong !== null) {
        audio.play()
        updateControls()
    }
}
function pauseSong() {
    audio.pause()
    updateControls()
}
function changeActiveClass(lastIndex, newIndex) {
    const links = document.querySelectorAll("a")
    if (lastIndex !== null) {
        links[lastIndex].classList.remove("active")
    }
    links[newIndex].classList.add("active")
}
function changeCover(songIndex) {
    cover.src = "./imagenes/" + songList[songIndex].cover
}
function changeSongtitle(songIndex) {
     title.innerText = songList[songIndex].title
}
function prevSong() {
    if (actualSong > 0) {
        loadSong(actualSong - 1)
    } else {
        loadSong(songList.length - 1)
    }
}
function nextSong() {
    if (actualSong < songList.length -1) {
        loadSong(actualSong + 1)
    } else {
        loadSong(0)
    }
}
audio.addEventListener("ended", () => nextSong())
loadSongs()


