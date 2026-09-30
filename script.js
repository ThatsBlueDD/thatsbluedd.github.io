const video = document.getElementById("video");

const videos = [
    "sbr.mp4",
    "sc.mp4",
    "videos/bds (1).mp4"
];

let lastVideo = null;
let hasInteracted = false;

function playRandomVideo() {
    let nextVideo;

    do {
        nextVideo = videos[Math.floor(Math.random() * videos.length)];
    } while (videos.length > 1 && nextVideo === lastVideo);

    lastVideo = nextVideo;

    video.src = nextVideo;
    video.muted = !hasInteracted;

    video.play().catch(() => {});
}

function enableAudio() {
    if (hasInteracted) return;

    hasInteracted = true;
    video.muted = false;

    video.play().catch(() => {});
}

document.addEventListener("click", enableAudio, { once: true });

video.addEventListener("ended", playRandomVideo);

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        video.pause();
    } else {
        video.play().catch(() => {});
    }
});

playRandomVideo();
