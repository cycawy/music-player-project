const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let isPlaying = false;

//Music
const songs = [
    {
        name:'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design',
    },
    {
        name:'jacinto-2',
        displayName: 'Seven Nation Army',
        artist: 'Jacinto Design',
    },
    {
        name:'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design',
    },
    {
        name:'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/Jacinto Design',
    },
];

//play
function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

//pause
function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}


//play or pause Event listener
playBtn.addEventListener('click', () => (isPlaying? pauseSong():playSong()));

//update DOM
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = `img/${song.name}.jpg`;
    music.src = `music/${song.name}.mp3`;
}


let songIndex = 0;
//On load,  select first song
loadSong(songs[songIndex]);

function previousSong(){
    songIndex--;
    if(songIndex<0){
        songIndex = songs.length-1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong(){
    songIndex++;
    if(songIndex>songs.length-1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//update progress Bar and Time
function updateProgressBar(e){
    if(isPlaying){
        const {duration, currentTime} = e.srcElement;
        const progressPercent = (currentTime/duration)*100;
        progress.style.width = `${progressPercent}%`;
        
        //calculate durationEl (durationMinute:durationSecond) and display it
        const durationMinute = Math.floor(duration/60);
        let durationSecond = Math.floor(duration%60);
        if(durationSecond<10){
            durationSecond = `0${durationSecond}`;
        }
        if(durationSecond){
            durationEl.textContent = `${durationMinute}:${durationSecond}`;
        }
        
        //calculate currentTimeEl (currentTimeMinute:currentTimeSecond) and display it
        const currentTimeMinute = Math.floor(currentTime/60);
        let currentTimeSecond = Math.floor(currentTime%60);
        if(currentTimeSecond<10){
            currentTimeSecond = `0${currentTimeSecond}`;
        }
        if(currentTimeSecond){  
            currentTimeEl.textContent = `${currentTimeMinute}:${currentTimeSecond}`;
        }
    }
}

//set progress bar at click event
function setProgressBar(e){
    const width = this.clientWidth;
    const offsetX = e.offsetX;
    music.currentTime = (offsetX/width)*music.duration;
}

//prevBtn nextBtn event listener
prevBtn.addEventListener('click', previousSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
music.addEventListener('ended', nextSong)