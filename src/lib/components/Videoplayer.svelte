<script lang="ts">
    import { getMediaSources } from "$lib/s3/s3";
    import { onMount } from "svelte";
    import { onVideoTimeUpdate } from "$lib/utils/videoTimeUpdate";
    import type { TimeUpdateParameters } from "$lib/interfaces/videoplayer.interface";
    import type { Subtitle, Segment, Speaker } from "$lib/interfaces/videoplayer.interface";

    export let videoId: string;
    export let startTime: string;
    export let timeUpdateParameters: TimeUpdateParameters;
    export let subtitles: Subtitle[] = [];
    export let segments: Segment[] = [];
    export let speakers: Speaker[] = [];

    let video: HTMLVideoElement;
    let { videoSrc, trackSrc } = getMediaSources(videoId);

    function handleTimeUpdate() {
      timeUpdateParameters = onVideoTimeUpdate(
        video.currentTime,
        subtitles,
        segments,
        speakers,
        timeUpdateParameters.currentSubtitleIndex,
      );
    }

    export function jumpToTime(video: HTMLVideoElement, time: number) {
        video.currentTime = time;
        video.play(); // Optionally start playing after jump
    }

    onMount(async () => {
      if (startTime) {
        jumpToTime(video, Number(startTime));
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
  