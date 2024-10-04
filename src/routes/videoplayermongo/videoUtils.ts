export function onTimeUpdate(video: HTMLVideoElement, subtitles: any[]) {
    console.log("update subtitle on time");
    console.log(video.currentTime);
    console.log(subtitles);
    const updatedData = updateSubtitle(video.currentTime, subtitles);
    console.log(updatedData);
    return {
        subtitle: updatedData.subtitle,
        currentSpeaker: updatedData.currentSpeaker,
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

  export function updateSubtitle(currentTime: number, subtitles: { start: number; end: number; text: string, speaker: string }[]) {
    console.log("find subtitle");
    console.log(currentTime)
    console.log(subtitles);
    const currentSubtitle = subtitles.find(sub => currentTime >= sub.start && currentTime <= sub.end);
    console.log("================?")
    console.log(currentSubtitle);
    if (currentSubtitle) {
        return {
            subtitle: currentSubtitle.text,
            currentSpeaker: currentSubtitle.speaker
        };
    }
    return {
        subtitle: '',
        currentSpeaker: ''
    };
}
 
