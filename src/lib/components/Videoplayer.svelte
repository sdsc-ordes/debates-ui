<script lang="ts">
    import { getMediaSources } from "$lib/s3/s3";
    import { onVideoTimeUpdate } from "$lib/utils/videoTimeUpdate";
    import type { TimeUpdateParameters } from "$lib/interfaces/subtitle.interface";
    import type { Subtitle } from "$lib/interfaces/subtitle.interface";

    export let videoId: string;
    export let timeUpdateParameters: TimeUpdateParameters;
    export let subtitles: Subtitle[] = [];

    let video: HTMLVideoElement;
    let { videoSrc, trackSrc } = getMediaSources(videoId);

    function handleTimeUpdate() {
      timeUpdateParameters = onVideoTimeUpdate(
        video.currentTime,
        subtitles,
        timeUpdateParameters.currentSubtitleIndex,
      );
    }
  </script>
  
  <div class="video-container">
    <video
      class="video"
      bind:this={video}
      on:timeupdate={handleTimeUpdate}
      controls
      autoplay
    >
      <source src={videoSrc} type="video/mp4" />
      <track
        src={trackSrc}
        kind="captions"
        srclang="en"
        label="english_captions"
      />
      Your browser does not support the video tag.
    </video>
  </div>
  
  <style>
    .video {
      width: 600px;
      border: 1px solid #ddd;
    }
  </style>
  