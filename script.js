const video = document.getElementById("video");

const videos = [
    "sbr.mp4",
    "sc.mp4",
    "videos/bds (1).mp4",
    "videos/urabadapple.mp4"
];

let lastVideo = null;

function playRandomVideo() {
    let nextVideo;

    do {
        nextVideo = videos[Math.floor(Math.random() * videos.length)];
    } while (videos.length > 1 && nextVideo === lastVideo);

    lastVideo = nextVideo;

    video.src = nextVideo;
    video.play();
}

video.addEventListener("ended", playRandomVideo);

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        video.pause();
    } else {
        video.play();
    }
});

playRandomVideo();
