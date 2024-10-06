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

export function formatTime(seconds: number): string {
    // Calculate hours, minutes, and seconds
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const millis = Math.floor((seconds % 1) * 1000);

    // Format the time parts to be two digits each, with milliseconds being three digits
    const hrsStr = String(hrs).padStart(2, "0");
    const minsStr = String(mins).padStart(2, "0");
    const secsStr = String(secs).padStart(2, "0");
    const millisStr = String(millis).padStart(3, "0");

    // Return formatted time string
    return `${hrsStr}:${minsStr}:${secsStr},${millisStr}`;
}

export function formatTimeDisplay(seconds: number): string {
    const date = new Date(seconds * 1000);
    return date.toISOString().substr(11, 8);
}
