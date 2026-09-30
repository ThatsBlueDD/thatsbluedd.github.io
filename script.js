const video = document.getElementById("video");

const videos = [
    {
        video: "sbr.mp4",
        audio: "sbr.ogg"
    },
    {
        video: "sc.mp4",
        audio: "sc.ogg"
    },
    {
        video: "videos/bds (1).mp4",
        audio: "bds.ogg"
    },
    {
        video: "videos/urabadapple.mp4",
        audio: "urabadapple.ogg"
    }
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

function playMinecraftAudio(audioFile) {
    if (typeof fancymenu === "undefined") {
        status("FANCYMENU API NOT READY");
        return;
    }

    const audioConfig = JSON.stringify({
        audioSource: `[source:local]/config/fancymenu/assets/${audioFile}`,
        soundChannel: "master",
        baseVolume: 1.0
    });

    fancymenu.actions.execute("play_audio", audioConfig);

    status("PLAYING AUDIO: " + audioFile);
}

function stopMinecraftAudio() {
    if (typeof fancymenu === "undefined") {
        return;
    }

    fancymenu.actions.execute("stop_all_action_audios");
}

function playRandomVideo() {
    let next;

    do {
        next = videos[Math.floor(Math.random() * videos.length)];
    } while (videos.length > 1 && next === lastVideo);

    lastVideo = next;
    stopMinecraftAudio();
    video.src = next.video;
    video.muted = true;
    video.play().catch(error => {
        status("VIDEO PLAY FAILED: " + error);
    });

    playMinecraftAudio(next.audio);
}

video.addEventListener("ended", playRandomVideo);

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        video.pause();
        stopMinecraftAudio();
    } else {
        video.play().catch(() => {});
    }
});

if (typeof fancymenu !== "undefined") {
    playRandomVideo();
} else {
    window.addEventListener("fancymenu-ready", () => {
        playRandomVideo();
    }, { once: true });
}
