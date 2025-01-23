<script lang="ts">
  import { onMount } from "svelte";
  import { onVideoTimeUpdate } from "$lib/utils/videoTimeUpdate";
  import { jumpToTime } from "$lib/utils/videoStartUtils";
  import type { TimeUpdateParameters } from "$lib/interfaces/videoplayer.interface";
  import type {
    Subtitle,
    Speaker,
  } from "$lib/interfaces/backend.interface";
  export let startTime: number;
  export let timeUpdateParameters: TimeUpdateParameters;
  export let subtitles: Subtitle[] = [];
  export let subtitles_en: Subtitle[] = [];
  export let speakers: Speaker[] = [];
  export let mediaElement: HTMLMediaElement;
  export let mediaUrl: string;
  export let media;

  function handleTimeUpdate() {
    timeUpdateParameters = onVideoTimeUpdate(
      mediaElement.currentTime,
      subtitles,
      subtitles_en,
      speakers,
      timeUpdateParameters.currentSubtitleIndex,
      timeUpdateParameters.currentSubtitleIndexEn
    );
  }

  onMount(async () => {
    if (startTime) {
      jumpToTime(mediaElement, startTime);
    }
  });
</script>

<div class="media-container">
  {#if media.type === "video"}
    <!-- svelte-ignore a11y-media-has-caption -->
    <video
      class="media"
      bind:this={mediaElement}
      on:timeupdate={handleTimeUpdate}
      controls
      disablePictureInPicture
    >
      <source src={mediaUrl} type={media.type}/{media.format} />
      Your browser does not support the video tag.
    </video>
  {:else if media.type === "audio"}
    <audio
      class="media"
      bind:this={mediaElement}
      on:timeupdate={handleTimeUpdate}
      controls
      autoplay
    >
      <source src={mediaUrl} type={media.type}/{media.format} />
      Your browser does not support the audio tag.
    </audio>
  {/if}
</div>

<style>
  .media {
    width: 600px;
    border: 1px solid #ddd;
  }

  .media-container {
    text-align: center;
    margin: 20px auto;
  }
</style>
