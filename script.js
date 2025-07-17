window.onerror = function(msg, src, lineno, colno, error) {
  console.error("Erro global capturado:", msg, error);
};

const widgetIframe = document.getElementById('sc-player');
const widget = SC.Widget(widgetIframe);

const albumArt = document.getElementById('album-art');
const title = document.getElementById('track-title');
const progress = document.getElementById('progress');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const playlistDiv = document.getElementById('playlist');

const tracks = [
  {
    title: "Lo-fi Chillhop Cat - Sleepy Days",
    url: "https://api.soundcloud.com/tracks/1264506369",
    image: "https://i.imgur.com/TxHjK0f.png"
  },
  {
    title: "Chillhop Dreams - Nymano",
    url: "https://api.soundcloud.com/tracks/1264507513",
    image: "https://i.imgur.com/fG5Kzkz.png"
  },
  {
    title: "Lo-fi Beats - Philanthrope",
    url: "https://api.soundcloud.com/tracks/1264508094",
    image: "https://i.imgur.com/NjDjCEe.png"
  }
];

let trackIndex = 0;
let isPlaying = false;

function loadTrack(index, autoplay = false) {
  const track = tracks[index];
  widget.load(track.url, {
    auto_play: autoplay,
    show_artwork: false
  });
  albumArt.src = track.image;
  title.textContent = track.title;
  progress.style.width = "0%";
  playBtn.querySelector('i').className = "fa fa-play";
  isPlaying = false;
}

widget.bind(SC.Widget.Events.PLAY_PROGRESS, function(e) {
  progress.style.width = (e.relativePosition * 100) + "%";
});

widget.bind(SC.Widget.Events.FINISH, function() {
  nextTrack();
});

function togglePlay() {
  if (isPlaying) {
    widget.pause();
    playBtn.querySelector('i').className = "fa fa-play";
  } else {
    widget.play();
    playBtn.querySelector('i').className = "fa fa-pause";
  }
  isPlaying = !isPlaying;
}

function nextTrack() {
  trackIndex = (trackIndex + 1) % tracks.length;
  loadTrack(trackIndex, true);
}

function prevTrack() {
  trackIndex = (trackIndex - 1 + tracks.length) % tracks.length;
  loadTrack(trackIndex, true);
}

playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);

tracks.forEach((track, i) => {
  const div = document.createElement('div');
  div.className = 'track';
  div.innerHTML = \`
    <img src="\${track.image}" alt="\${track.title}" />
    <p>\${track.title}</p>
  \`;
  div.addEventListener('click', () => {
    trackIndex = i;
    loadTrack(trackIndex, true);
  });
  playlistDiv.appendChild(div);
});

// Inicializa com primeira faixa
loadTrack(trackIndex, false);
