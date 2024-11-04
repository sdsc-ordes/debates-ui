<script lang="ts">
  import { onMount } from "svelte";
  import { onVideoTimeUpdate } from "$lib/utils/videoTimeUpdate";
  import { jumpToTime } from "$lib/utils/videoStartUtils";
  import type { TimeUpdateParameters } from "$lib/interfaces/videoplayer.interface";
  import type {
    Subtitle,
    Segment,
    Speaker,
  } from "$lib/interfaces/videoplayer.interface";
  import type { VideoData } from "$lib/interfaces/mongodb.interface";
  export let startTime: number;
  export let timeUpdateParameters: TimeUpdateParameters;
  export let subtitles: Subtitle[] = [];
  export let segments: Segment[] = [];
  export let speakers: Speaker[] = [];
  export let video: HTMLVideoElement;
  export let videoData: VideoData;
  export let videoSrc: string;
  export let trackSrc: string;

  function handleTimeUpdate() {
    timeUpdateParameters = onVideoTimeUpdate(
      video.currentTime,
      subtitles,
      segments,
      speakers,
      videoData,
      timeUpdateParameters.currentSubtitleIndex,
    );
  }

  onMount(async () => {
    if (startTime) {
      jumpToTime(video, startTime);
    }
  });
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
