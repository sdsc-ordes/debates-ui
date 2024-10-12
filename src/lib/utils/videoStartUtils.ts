export function jumpToTime(video: HTMLVideoElement, start: number) {
    video.currentTime = start;
    video.play();
}
