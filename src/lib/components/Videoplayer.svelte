<script lang="ts">
    import { getMediaSources } from "$lib/s3/s3";
    import type { TimeUpdateParameters } from "$lib/interfaces/subtitle.interface";

    export let videoId: string;

    let video: HTMLVideoElement;
    let { videoSrc, trackSrc } = getMediaSources(videoId);

    export let timeUpdateParameters: TimeUpdateParameters;
  
    function handleTimeUpdate() {
      timeUpdateParameters = {
        currentTime: video.currentTime,
        currentSubtitleIndex: 3,
        currentSegmentIndex: 0,
        currentSpeakerIndex: 6,
      }
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
  