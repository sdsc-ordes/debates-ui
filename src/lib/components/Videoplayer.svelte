<script lang="ts">
    export let videoSrc: string;
    export let trackSrc: string;
  
    let video: HTMLVideoElement;
    export let parameters: number;
    export let updateParameters: { index: number; content: string };
  
    function handleTimeUpdate() {
      parameters = video.currentTime;
      updateParameters = {
        index: 123 + parameters,
        content: "hello",
      };
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
  