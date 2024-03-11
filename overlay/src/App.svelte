<script>
    import Scoreboard from "./lib/scoreboard.svelte";
    import Players from "./lib/players.svelte";
    import Focs from "./lib/focs.svelte";
    import { onMount } from "svelte";
    import { createSocketConnection, panelData } from "./lib/socketio.js";
    import Stinger from "./lib/stinger.svelte";
    import Postgame from "./lib/postgame/postgame.svelte";
    import Replay from "./lib/replaycard.svelte";
    let mounted = false;
    onMount(() => {
      createSocketConnection();
    })
  
  </script>
  <body>
    <main>
      <!-- <img src="/src/assets/Asset%204.png" alt="test" width="1920" height="1080" style="position:absolute; left: 0px; top: 0px;"> -->
      <Postgame />
      <Scoreboard />
      <Players />
      <Focs />
      <Stinger />
      <Replay />
    </main>
  </body>
  
  <style>
    @font-face {
      font-family: mont-heavy;
      src: url('/MONT-HEAVYDEMO.OTF');
    }
    @font-face {
      font-family: BankSansEFCY-MedConObl;
      src: url('/Bank Sans EF CY Condensed Medium Oblique.otf');
    }
    @font-face {
      font-family: akira-expanded;
      src: url('/AKIRA_EXPANDED_DEMO.OTF');
    }
    @font-face {
      font-family: IntegralCF-Regular;
      src: url('/INTEGRALCF-REGULAR.OTF');
    }
    @font-face {
      font-family: Integral-Mono;
      src: url('/Integral-Mono.OTF');
    }
    body::-webkit-scrollbar {
          display: none;
      }
  </style>
  