<script lang="ts">
  import { getMediaSources } from "$lib/s3/s3Client";
  import { onMount } from "svelte";
  import { onVideoTimeUpdate } from "$lib/utils/videoTimeUpdate";
  import { jumpToTime } from "$lib/utils/videoStartUtils";
  import type { MediaSources } from '$lib/interfaces/videoplayer.interface'
  import type { TimeUpdateParameters } from "$lib/interfaces/videoplayer.interface";
  import type {
    Subtitle,
    Segment,
    Speaker,
  } from "$lib/interfaces/videoplayer.interface";

  export let mediaSources: MediaSources;
  export let startTime: number;
  export let timeUpdateParameters: TimeUpdateParameters;
  export let subtitles: Subtitle[] = [];
  export let segments: Segment[] = [];
  export let speakers: Speaker[] = [];
  export let video: HTMLVideoElement;

  function handleTimeUpdate() {
    timeUpdateParameters = onVideoTimeUpdate(
      video.currentTime,
      subtitles,
      segments,
      speakers,
      timeUpdateParameters.currentSubtitleIndex,
    );
  }

  onMount(async () => {
    if (startTime) {
      jumpToTime(video, startTime);
    }
  });
</script>



<style>
  .video {
    width: 600px;
    border: 1px solid #ddd;
  }
</style>
