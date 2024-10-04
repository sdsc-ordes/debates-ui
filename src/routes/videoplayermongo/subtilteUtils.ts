// Function to update the current subtitle and speaker
export function updateSubtitle(currentTime: number, subtitles: { start: number; end: number; text: string, speaker: string }[]) {
    const currentSubtitle = subtitles.find(sub => currentTime >= sub.start && currentTime <= sub.end);
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
