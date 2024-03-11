<script>
  import { onMount } from "svelte";
  import {
    data,
    panelData,
    isReplay,
    isInGame,
    stingerBool,
    goalData,
    lTeam,
    rTeam,
  } from "./socketio.js";
  import * as teamData from "../teamconfig.json"
  import { tweened } from "svelte/motion";

  onMount(() => {
    console.log("stinger loaded");
  });
  let opac = tweened(0, {
    duration: 100
  });
  let stinger;
  let saudio;
  $: {
    console.log($goalData?.team)
    if($stingerBool){
        saudio.volume = 0.3
        $opac = 1
        setTimeout(() => {
            $opac = 0
        }, 1900);
        stinger.play()
        saudio.play()
    }
  }
</script>
<main style="opacity: {$opac};">
    <!-- svelte-ignore a11y-media-has-caption -->
    <video preload="auto" src="/src/assets/Comp_1.webm" width="1920" height="1080" bind:this={stinger} type="video/webm" style="position: absolute; top: 0; left: 0;"></video>
    <!-- <audio preload="auto" src="/src/assets/Animated_logos/Logo_Audio.wav" bind:this={saudio}></audio> -->
</main>

<style>
</style>
