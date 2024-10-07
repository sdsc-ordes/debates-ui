import type { Subtitle } from "./subtitle.interface";

export function onTimeUpdate(currentTime: number, subtitles: Subtitle[]): number {
    const currentSubtitle = subtitles.find(sub => currentTime >= sub.start && currentTime <= sub.end);
    if (currentSubtitle) {
        return currentSubtitle.index;
    }
    return -1;
}

export function jumpToTime(video: HTMLVideoElement, time: number) {
    video.currentTime = time;
    video.play(); // Optionally start playing after jump
}

export function formatTimeForDisplay(seconds: number): string {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const hrsStr = String(hrs).padStart(1, "0");
    const minsStr = String(mins).padStart(2, "0");
    const secsStr = String(secs).padStart(2, "0");
    if (hrs) {
        return `${hrsStr}:${minsStr}:${secsStr}`;
    }
    return `${minsStr}:${secsStr}`;
}
