export function onTimeUpdate(video: HTMLVideoElement, subtitles: any[]) {
    const updatedData = updateSubtitle(video.currentTime, subtitles);
    return {
        subtitle: updatedData.subtitle,
        currentSpeaker: updatedData.currentSpeaker,
        index: updatedData.index,
    };
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

export function updateSubtitle(
    currentTime: number, subtitles: { 
        start: number; end: number; text: string, speaker: string }[]) {
    const currentSubtitle = subtitles.find(sub => currentTime >= sub.start && currentTime <= sub.end);
    if (currentSubtitle) {
        return {
            subtitle: currentSubtitle.text,
            currentSpeaker: currentSubtitle.speaker,
            index: currentSubtitle.index,
        };
    }
    return {
        subtitle: '',
        currentSpeaker: '',
        index: -1,
    };
}

export function formatTimeDisplay(seconds: number): string {
    const date = new Date(seconds * 1000);
    return date.toISOString().substr(11, 8);
}

export function handleTimeUpdate(video: HTMLVideoElement, subtitles: any[]) {
    const currentTime = video.currentTime;
    const currentSubtitle = subtitles.find(
      (subtitle) => currentTime >= subtitle.start && currentTime <= subtitle.end
    );
    const updatedData = {
      subtitle: currentSubtitle ? currentSubtitle.text : "",
      currentSpeaker: currentSubtitle ? currentSubtitle.speaker : "",
      index: currentSubtitle ? currentSubtitle.index : -1
    };
  
    return updatedData;
  }
