const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range')
const progressBar = document.querySelector('.progress-bar')
const playBtn = document.querySelector('#play-btn')
const volumeIcon = document.querySelector('#volume-icon')
const volumeRange = document.querySelector('.volume-range')
const volumeBar = document.querySelector('.volume-bar')
const currentTime = document.querySelector('.time-elapsed')
const duration = document.querySelector('.time-duration')
const fullscreenBtn = document.querySelector('.fullscreen')
const speed = document.querySelector('.player-speed')
const player = document.querySelector('.player')



// Play & Pause ----------------------------------- //

function showplayIcon () {
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');

}

function togglePlay () {
    if (video.paused) {
        video.play()
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.setAttribute('title', 'pause');
    }else {
        video.pause();
        showplayIcon()
    }
}


// Progress Bar ---------------------------------- //

// calculate display time
function displayTime (time) {
    const minutes = Math.floor(time / 60)
    let secs = Math.floor(time % 60)
    secs = secs > 9 ? secs : `0${secs}`
    return `${minutes}:${secs}`
}

// update progress
function updateProgress () {
 progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
 currentTime.textContent = `${displayTime(video.currentTime)} /`
 duration.textContent = `${displayTime(video.duration)}`
}
// seek
function setProgress (e) {
    const newTime = e.offsetX / progressRange.offsetWidth
    progressBar.style.width = `${newTime * 100}%`;
    video.currentTime = newTime * video.duration;
}

// Volume Controls --------------------------- //

// mute function

let lastVol = 1;

function changeVolume (e) {
    let volume = e.offsetX / volumeRange.offsetWidth;
    // rounding up or down
    if (volume < 0.1){
        volume = 0;
    }
    if (volume > 0.9){
        volume = 1;
    }
    volumeBar.style.width = `${volume * 100}%`;
    video.volume = volume
    volumeIcon.className = '';
    if (volume > 0.7){
        volumeIcon.classList.add('fas', 'fa-volume-up')
    }
    else if (volume < 0.7 && volume > 0){
        volumeIcon.classList.add('fas', 'fa-volume-down')
    }
    else if (volume === 0){
        volumeIcon.classList.add('fas', 'fa-volume-off')
    }
    lastVol = volume;
}

// mute & unmute

function toggleMute () {
    volumeIcon.className = '';
if (video.volume) {
    lastVol = video.volume;
    video.volume = 0
    volumeBar.style.width = 0
    volumeIcon.classList.add('fas', 'fa-volume-mute')
    volumeIcon.setAttribute('title', 'Unmute')

}else {
    video.volume = lastVol;
    volumeBar.style.width = `${lastVol * 100}%`;
    volumeIcon.classList.add('fas', 'fa-volume-up')

    volumeIcon.setAttribute('title', 'Mute')

}
}

// Change Playback Speed -------------------- //
 function changeSpeed () {
 video.playbackRate = speed.value;
 }


// Fullscreen ------------------------------- //
/* Get the element you want displayed in fullscreen */ 

/* Function to open fullscreen mode */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem = window.top.document.body; //To break out of frame in IE
    elem.msRequestFullscreen();
  }
  video.classList.add('video-fullscreen')
}

/* Function to close fullscreen mode */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    window.top.document.msExitFullscreen();
  }
  video.classList.remove('video-fullscreen')

}

let fullscreen = false;
function toggleFullscreen () {
    if (!fullscreen) {
        openFullscreen (player); 
    }else{
        closeFullscreen()
    }
    fullscreen = !fullscreen
}

// events
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress)
volumeRange.addEventListener('click', changeVolume)
volumeIcon.addEventListener('click', toggleMute)
speed.addEventListener('change', changeSpeed)
fullscreenBtn.addEventListener('click', toggleFullscreen)
