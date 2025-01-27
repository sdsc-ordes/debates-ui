<script lang="ts">
  import { page } from "$app/stores";
  import type { PageData } from "./$types";
  import "./page.css";
  import { Notifications, acts } from "@tadashi/svelte-notification";
  import MediaPlayer from "$lib/components/MediaPlayer.svelte";
  import SegmentDisplay from "$lib/components/SegmentDisplay.svelte";
  import { onMediaTimeUpdate } from "$lib/utils/mediaTimeUpdate";
  import DebateHeader from "$lib/components/DebateHeader.svelte";
  import SegmentList from "$lib/components/SegmentList.svelte";
  import SpeakerDisplay from "$lib/components/SpeakerDisplay.svelte";
  import type {
    TimeUpdateParameters,
  } from "$lib/interfaces/mediaplayer.interface";
  import type {
    Speaker,
    Segment,
    Subtitle,
    SignedUrl,
    Debate,
  } from "$lib/interfaces/backend.interface";
    import DebateToolBar from "$lib/components/DebateToolBar.svelte";

  export let data: PageData;
  const s3Prefix: string = data?.prefix;
  const debate: Debate = data?.debate;
  let subtitles: Subtitle[] = data?.subtitles;
  let subtitles_en: Subtitle[] = data?.subtitles_en;
  const segments: Segment[] = data?.segments;
  let speakers: Speaker[] = data?.speakers;
  const mediaUrl: string = data?.signedUrls.signedMediaUrl;
  const media = data.media;
  const downloadUrls: SignedUrl[] = data?.signedUrls.signedUrls;

  let startTime: number = Number($page.url.searchParams.get("start") || 0);
  let timeUpdateParameters: TimeUpdateParameters = onMediaTimeUpdate(
    startTime,
    subtitles_en,
    subtitles,
    segments,
  );
  let mediaElement: HTMLVideoElement;

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
    <SpeakerDisplay bind:speakers {timeUpdateParameters} {s3Prefix} />
  </div>

  <div class="col-md-6">

    <MediaPlayer
      {startTime}
      {subtitles}
      {subtitles_en}
      {speakers}
      {segments}
      {mediaUrl}
      {media}
      bind:mediaElement
      bind:timeUpdateParameters
    />
  </div>
</div>

<DebateToolBar {downloadUrls} />

<SegmentDisplay {subtitles} {subtitles_en} {segments} {timeUpdateParameters} {s3Prefix} {mediaElement} />

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
