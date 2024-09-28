// src/utils/parseSRT.ts

// Helper to convert SRT time format to seconds
export function parseTime(hours: string, minutes: string, seconds: string, milliseconds: string): number {
    return (+hours) * 3600 + (+minutes) * 60 + (+seconds) + (+milliseconds) / 1000;
}

// Helper to split the speaker and the transcript text
export function parseSpeakerAndText(subtitleText: string): [string, string] {
    const speakerRegex = /^\[(.+?)\]:\s*/;
    const match = subtitleText.match(speakerRegex);
    if (match) {
        const speaker = match[1];
        const text = subtitleText.replace(speakerRegex, ''); // Remove the speaker from the text
        return [speaker, text];
    }
    return ['Unknown', subtitleText];
}

// Function to parse the SRT file into an array of subtitles with start and end times
export function parseSRT(srtContent: string) {
    const regex = /(\d+)\n(\d{2}):(\d{2}):(\d{2}),(\d{3}) --> (\d{2}):(\d{2}):(\d{2}),(\d{3})\n([\s\S]*?)(?=\n\d|\n*$)/g;
    let result;
    let tempSpeakers: { speaker: string, start: number }[] = [];
    let tempChairStatements: { start: number }[] = [];
    let lastSpeaker = ''; // Track the last speaker to only push when it changes
    let parsedSubtitles: { start: number; end: number; text: string, speaker: string }[] = [];
    let chair = '';

    while ((result = regex.exec(srtContent)) !== null) {
        const start = parseTime(result[2], result[3], result[4], result[5]);
        const end = parseTime(result[6], result[7], result[8], result[9]);
        const text = result[10].replace(/\n/g, ' ');
        const [speaker, content] = parseSpeakerAndText(text); // Split speaker and content

        // Set the first speaker as the "Chair"
        if (!chair) {
            chair = speaker;
        }

        parsedSubtitles.push({ start, end, text: content, speaker });

        // Handle chair's multiple statements
        if (speaker === chair) {
            // Add a new entry for each time the chair speaks
            if (lastSpeaker !== speaker) {
                tempChairStatements.push({ start });
            }
        } else {
            // Add other speakers only if the speaker name changes
            if (speaker !== lastSpeaker) {
                tempSpeakers.push({ speaker, start });
            }
        }
        lastSpeaker = speaker;
    }

    return {
        parsedSubtitles,
        tempSpeakers,
        tempChairStatements,
        chair
    };
}
