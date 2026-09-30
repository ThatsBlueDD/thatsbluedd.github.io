const video = document.getElementById("video");

const videos = [
    "sbr.mp4",
    "sc.mp4",
    "videos/bds (1).mp4",
    "videos/urabadapple.mp4"
];

let lastVideo = null;

function status(message) {
    let element = document.getElementById("status");

    if (!element) {
        element = document.createElement("div");
        element.id = "status";

        Object.assign(element.style, {
            position: "fixed",
            top: "10px",
            left: "10px",
            zIndex: "9999",
            color: "white",
            background: "rgba(0, 0, 0, 0.8)",
            padding: "10px",
            fontFamily: "monospace",
            fontSize: "16px"
        });

        document.body.appendChild(element);
    }

    element.textContent = message;
}

function playRandomVideo() {
    let nextVideo;

    do {
        nextVideo = videos[Math.floor(Math.random() * videos.length)];
    } while (videos.length > 1 && nextVideo === lastVideo);

    lastVideo = nextVideo;

    video.src = nextVideo;
    video.muted = true;

    video.play().catch(error => {
        status("VIDEO PLAY FAILED: " + error);
    });
}

document.addEventListener("click", async () => {
    status("CLICK DETECTED");

    video.muted = false;
    video.volume = 1.0;

    try {
        await video.play();
        status("AUDIO PLAYBACK SUCCESS");
    } catch (error) {
        status("AUDIO PLAYBACK FAILED: " + error);
    }
}, { once: true });

video.addEventListener("ended", playRandomVideo);

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        video.pause();
    } else {
        video.play().catch(() => {});
    }
});

playRandomVideo();
