<script lang="ts">
  import { page } from "$app/stores";
  import type { PageData } from "./$types";
  import "./page.css";
  import { Notifications, acts } from "@tadashi/svelte-notification";
  import VideoPlayer from "$lib/components/VideoPlayer.svelte";
  import SegmentDisplay from "$lib/components/SegmentDisplay.svelte";
  import DebateHeader from "$lib/components/DebateHeader.svelte";
  import SegmentList from "$lib/components/SegmentList.svelte";
  import SpeakerDisplay from "$lib/components/SpeakerDisplay.svelte";
  import { getCreatedAtDate, generateUUID } from "$lib/utils/mongoUpdateUtils";
  import { canEdit } from "$lib/stores/auth";
  import type {
    TimeUpdateParameters,
  } from "$lib/interfaces/videoplayer.interface";
  import type {
    Speaker,
    Segment,
    Subtitle,
    Debate,
    SignedUrls,
  } from "$lib/interfaces/backend.interface";
    import DebateToolBar from "$lib/components/DebateToolBar.svelte";

  export let data: PageData;
  let signedUrls: SignedUrls = data?.signedUrls;
  let debate: Debate = data?.debate;
  console.log(debate);
  let subtitles: Subtitle[] = data?.subtitles;
  let subtitles_en: Subtitle[] = data?.subtitles_en;
  let segments: Segment[] = data?.segments;
  console.log(debate);
  let speakers: Speaker[] = data?.speakers;
  const mediaUrl = signedUrls.signedMediaUrl;
  const media = data.media;
  const downloadUrls = signedUrls.signedUrls;

  let startTime: number = Number($page.url.searchParams.get("start") || 0);
  let mediaElement: HTMLVideoElement;

  let timeUpdateParameters: TimeUpdateParameters = {
    currentSubtitleIndex: -1,
    currentSubtitleIndexEn: -1,
    currentSegmentIndex: -1,
    currentSpeakerIndex: -1,
  };

</script>

<svelte:head>
  <title>VideoPlayer Page</title>
  <meta name="description" content="Videoplayer" />
  <style>
    :root {
      --tadashi_svelte_notifications_width: 300px;
    }
  </style>
</svelte:head>

<DebateHeader { debate } />

<div class="video-layout">
  <div class="col-md-3">
    <SegmentList {mediaElement} {segments} {speakers} {timeUpdateParameters} />
  </div>
  <div class="col-md-3">
    <SpeakerDisplay bind:speakers {timeUpdateParameters} />
  </div>

  <div class="col-md-6">

    <VideoPlayer
      {startTime}
      {subtitles}
      {subtitles_en}
      {speakers}
      {mediaUrl}
      {media}
      bind:mediaElement
      bind:timeUpdateParameters
    />
  </div>
</div>

<DebateToolBar {downloadUrls} />

<SegmentDisplay {subtitles} {subtitles_en} {timeUpdateParameters} {mediaElement} />

<Notifications />

<style>
  .video-layout {
  display: flex;
  justify-content: space-evenly; 
}

.col-md-3, .col-md-6 {
  flex-grow: 1; 
  display: flex;
  flex-direction: column;
}
</style>
