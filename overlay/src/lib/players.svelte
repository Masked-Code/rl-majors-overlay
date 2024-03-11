<script>
    import { onMount } from "svelte";
    import { data, panelData, isReplay, isInGame, stingerBool, lTeam, rTeam, postGame } from "./socketio.js";
    import { resize_to_fit } from "./resizeToFit.js";
    import {minimum_size} from "./minimumSize";
    export let bluePlayers = [];
    export let orangePlayers = [];

    import * as teamConfig from '../teamconfig.json'; 
import { tweened } from "svelte/motion";

    onMount(() => {
        console.log("Player cards loaded");

    });

    let bb1 = tweened(0);
    let bb2 = tweened(0);
    let bb3 = tweened(0);
    let ob1 = tweened(0);
    let ob2 = tweened(0);
    let ob3 = tweened(0);

    $: {
        if($stingerBool && document.getElementById("main-pc")){
            document.getElementById("main-pc").style.opacity = "0"
        }
        if(!$stingerBool && !$isReplay && document.getElementById("main-pc")){
            document.getElementById("main-pc").style.opacity = "1"
        }
        if ($data) {
            let playerList = [];
            orangePlayers = [];
            bluePlayers = [];
            for (let x in $data?.playerData.orangeTeam) {
                playerList.push($data?.playerData.orangeTeam[x]);
            }
            for (let x in $data?.playerData.blueTeam) {
                playerList.push($data?.playerData.blueTeam[x]);
            }
            try {
                for (let id in playerList) {
                    let pid;
                    for (let x in $data.playerData.orangeTeam) {
                        if (
                            $data.playerData.orangeTeam[x].id ==
                            playerList[id].id
                        ) {
                            pid = x;
                        }
                    }
                    for (let x in $data.playerData.blueTeam) {
                        if (
                            $data.playerData.blueTeam[x].id == playerList[id].id
                        ) {
                            pid = x;
                        }
                    }
                    let playerData = {
                        num: pid,
                        id: playerList[id].id,
                        name: playerList[id].name,
                        team: playerList[id].team == 1 ? "orange" : "blue",
                        boost: playerList[id].boost
                    };
                    if (playerList[id].team == 1) {
                        orangePlayers.push(playerData);
                    }
                    if (playerList[id].team == 0) {
                        bluePlayers.push(playerData);
                    }
                }
            } catch (error) {
                console.error(error);
            }
            for (let x in orangePlayers) {
                resize_to_fit(
                    document.getElementById(`${orangePlayers[x].id}-name`)
                        ? document.getElementById(`${orangePlayers[x].id}-name`)
                        : null,
                    300
                );
            }
            for (let x in bluePlayers) {
                resize_to_fit(
                    document.getElementById(`${bluePlayers[x].id}-name`)
                        ? document.getElementById(`${bluePlayers[x].id}-name`)
                        : null,
                    300
                );
            }
            let fullList = [];
            for (let id in playerList) {
                fullList.push(
                    document.getElementById(`${playerList[id].id}-name`)
                );
            }
            minimum_size(fullList);
            
            $bb1 = bluePlayers[0]?.boost / 100 * 295
            $bb2 = bluePlayers[1]?.boost / 100 * 298
            $bb3 = bluePlayers[2]?.boost / 100 * 302
            $ob1 = orangePlayers[0]?.boost / 100 * 295
            $ob2 = orangePlayers[1]?.boost / 100 * 298
            $ob3 = orangePlayers[2]?.boost / 100 * 302
        }
    }
</script>

<main>
    <div style="opacity: {!$stingerBool && !$isReplay && $isInGame && !$postGame ? 1 : 0}">
      <svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" width="305" height="130" xmlns:xlink="http://www.w3.org/1999/xlink" transform="translate(0, -100)" viewBox="0 0 305 130">
        <defs>
          <linearGradient id="linear-gradient" x1="-5875.77" y1="129" x2="-5875.77" y2="93.5" gradientTransform="translate(-5723.33) rotate(-180) scale(1 -1)" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#192d3d"/>
            <stop offset=".32" stop-color="#111d29"/>
            <stop offset=".71" stop-color="#0a0f18"/>
            <stop offset="1" stop-color="#080b12"/>
          </linearGradient>
          <linearGradient id="linear-gradient-2" x1="-5873.08" y1="82.5" x2="-5873.08" y2="47.5" xlink:href="#linear-gradient"/>
          <linearGradient id="linear-gradient-3" x1="-5870.43" y1="36.5" x2="-5870.43" y2="1" xlink:href="#linear-gradient"/>
          <clipPath id="boost-2">
            <polygon id="pc-boost-bar-2" data-name="pc-boost-bar" points="297.35 81.42 2 81.42 2 77.05 296.85 77.05 297.35 81.42" style="fill: #df2923;"/>
          </clipPath>
          <clipPath id="boost-1">
            <polygon id="pc-boost-bar-3" data-name="pc-boost-bar" points="292.01 35 2 35 2 30.63 291.52 30.63 292.01 35" style="fill: #df2923;"/>
          </clipPath>
          <clipPath id="boost-3">
            <polygon id="pc-boost-bar" points="302.71 127.52 2 127.52 2 123.15 302.2 123.15 302.71 127.52" style="fill: #df2923;"/>          
        </clipPath>
        </defs>
        <g id="export-group">
          <g id="playercard-l3">
            <g>
              <polygon points="1 129 1 93.5 299.78 93.5 303.88 129 1 129" style="fill: url(#linear-gradient);"/>
              <path d="M298.89,94.5l3.87,33.5H2v-33.5H298.89m1.78-2H0v37.5H305l-4.33-37.5h0Z" style="fill: #192d3d;"/>
            </g>
            <rect x="2" y="123" width="{$bb3}" height="4" fill={teamConfig["teams"][$lTeam]["colors"]["scorebox-light"]} clip-path="url(#boost-3)"></rect>
            <text id="pc-name" transform="translate(11.04 115.37)" style="fill: #fff; font-family: BankSansEFCY-MedConObl, &apos;Bank Sans EF CY Condensed&apos;; font-size: 25px;">{bluePlayers[2]?.name || ""}</text>
            <text id="pc-boost" text-anchor="end" transform="translate(296.21 117.26)" style="fill: #fff; font-family: BankSansEFCY-MedConObl, &apos;Bank Sans EF CY Condensed&apos;; font-size: 25px;">{bluePlayers[2]?.boost >= 0 ? bluePlayers[2]?.boost : ""}</text>
          </g>
          <g id="playercard-l2">
            <g>
              <polygon points="1 82.5 1 47.5 294.47 47.5 298.51 82.5 1 82.5" style="fill: url(#linear-gradient-2);"/>
              <path d="M293.58,48.5l3.81,33H2V48.5H293.58m1.78-2H0v37H299.63l-4.27-37h0Z" style="fill: #192d3d;"/>
            </g>
            <rect x="2" y="77" width="{$bb2}" height="4" fill={teamConfig["teams"][$lTeam]["colors"]["scorebox-light"]} clip-path="url(#boost-2)"></rect>
            <text id="pc-name-2" data-name="pc-name" transform="translate(11.04 69.27)" style="fill: #fff; font-family: BankSansEFCY-MedConObl, &apos;Bank Sans EF CY Condensed&apos;; font-size: 25px;">{bluePlayers[1]?.name || ""}</text>
            <text id="pc-boost-2" text-anchor="end" data-name="pc-boost" transform="translate(290.66 71.16)" style="fill: #fff; font-family: BankSansEFCY-MedConObl, &apos;Bank Sans EF CY Condensed&apos;; font-size: 25px;">{bluePlayers[1]?.boost >= 0 ? bluePlayers[1]?.boost : ""}</text>
          </g>
          <g id="playercard-l1">
            <g id="pc-bg">
              <polygon points="1 36.5 1 1 289.11 1 293.2 36.5 1 36.5" style="fill: url(#linear-gradient-3);"/>
              <path d="M288.22,2l3.87,33.5H2V2H288.22m1.78-2H0V37.5H294.33L290,0h0Z" style="fill: #192d3d;"/>
            </g>
            <rect x="2" y="30" width="{$bb1}" height="4" fill={teamConfig["teams"][$lTeam]["colors"]["scorebox-light"]} clip-path="url(#boost-1)"></rect>
            <text id="pc-name-3" data-name="pc-name" transform="translate(11.04 22.85)" style="fill: #fff; font-family: BankSansEFCY-MedConObl, &apos;Bank Sans EF CY Condensed&apos;; font-size: 25px;">{bluePlayers[0]?.name || ""}</text>
            <text id="pc-boost-3" text-anchor="end" data-name="pc-boost" transform="translate(284.4 24.74)" style="fill: #fff; font-family: BankSansEFCY-MedConObl, &apos;Bank Sans EF CY Condensed&apos;; font-size: 25px;">{bluePlayers[0]?.boost >= 0 ? bluePlayers[0]?.boost : ""}</text>
          </g>
        </g>
      </svg>
      <svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" transform="translate(1280 -100)" width="305" height="130" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 305 130">
        <defs>
          <linearGradient id="linear-gradient" x1="-5880.41" y1="129" x2="-5880.41" y2="93.5" gradientTransform="translate(6032.97)" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#192d3d"/>
            <stop offset=".32" stop-color="#111d29"/>
            <stop offset=".71" stop-color="#0a0f18"/>
            <stop offset="1" stop-color="#080b12"/>
          </linearGradient>
          <linearGradient id="linear-gradient-2" x1="-5877.73" y1="82.5" x2="-5877.73" y2="47.5" xlink:href="#linear-gradient"/>
          <linearGradient id="linear-gradient-3" x1="-5875.07" y1="36.5" x2="-5875.07" y2="1" xlink:href="#linear-gradient"/>
          <clipPath id="oboost-2">
            <polygon id="pc-boost-bar-2" data-name="pc-boost-bar" points="7.65 81.42 303 81.42 303 77.05 8.15 77.05 7.65 81.42" style="fill: #df2923;"/>
          </clipPath>
          <clipPath id="oboost-1">
            <polygon id="pc-boost-bar-3" data-name="pc-boost-bar" points="12.99 35 303 35 303 30.63 13.48 30.63 12.99 35" style="fill: #df2923;"/>
          </clipPath>
          <clipPath id="oboost-3">
            <polygon id="pc-boost-bar" points="2.29 127.52 303 127.52 303 123.15 2.8 123.15 2.29 127.52" style="fill: #df2923;"/>
        </clipPath>
        </defs>
        <g id="export-group">
          <g id="playercard-l3">
            <g>
              <polygon points="1.12 129 5.22 93.5 304 93.5 304 129 1.12 129" style="fill: url(#linear-gradient);"/>
              <path d="M303,94.5v33.5H2.24l3.87-33.5H303m2-2H4.33L0,130H305v-37.5h0Z" style="fill: #192d3d;"/>
            </g>
            <rect x="{2 + 302 - $ob3}" y="110" width="{$ob3}" height="25" fill={teamConfig["teams"][$rTeam]["colors"]["scorebox-light"]} clip-path="url(#oboost-3)"></rect>
            <text id="pc-name" transform="translate(290.21 115.37)" text-anchor="end" style="fill: #fff; font-family: BankSansEFCY-MedConObl, &apos;Bank Sans EF CY Condensed&apos;; font-size: 25px;">{orangePlayers[2]?.name || ""}</text>
            <text id="pc-boost" transform="translate(5.59 117.26)" style="fill: #fff; font-family: BankSansEFCY-MedConObl, &apos;Bank Sans EF CY Condensed&apos;; font-size: 25px;">{orangePlayers[2]?.boost >= 0 ? orangePlayers[2]?.boost : ""}</text>
          </g>
          <g id="playercard-l2">
            <g>
              <polygon points="6.49 82.5 10.53 47.5 304 47.5 304 82.5 6.49 82.5" style="fill: url(#linear-gradient-2);"/>
              <path d="M303,48.5v33H7.61l3.81-33H303m2-2H9.63l-4.27,37H305V46.5h0Z" style="fill: #192d3d;"/>
            </g>
            <rect x="{7 + 298 - $ob2}" y="70" width="{$ob2}" height="20" fill={teamConfig["teams"][$rTeam]["colors"]["scorebox-light"]} clip-path="url(#oboost-2)"></rect>
            <text id="pc-name-2" data-name="pc-name" text-anchor="end" transform="translate(290.21 69.27)" style="fill: #fff; font-family: BankSansEFCY-MedConObl, &apos;Bank Sans EF CY Condensed&apos;; font-size: 25px;">{orangePlayers[1]?.name || ""}</text>
            <text id="pc-boost-2" data-name="pc-boost" transform="translate(11.14 71.16)" style="fill: #fff; font-family: BankSansEFCY-MedConObl, &apos;Bank Sans EF CY Condensed&apos;; font-size: 25px;">{orangePlayers[1]?.boost >= 0 ? orangePlayers[1]?.boost : ""}</text>
          </g>
          <g id="playercard-l1">
            <g id="pc-bg">
              <polygon points="11.8 36.5 15.89 1 304 1 304 36.5 11.8 36.5" style="fill: url(#linear-gradient-3);"/>
              <path d="M303,2V35.5H12.92L16.78,2H303m2-2H15l-4.33,37.5H305V0h0Z" style="fill: #192d3d;"/>
            </g>
            <rect x="{13 + 295 - $ob1}" y="30" width="{$ob1}" height="4" fill={teamConfig["teams"][$rTeam]["colors"]["scorebox-light"]} clip-path="url(#oboost-1)"></rect>
            <text id="pc-name-3" data-name="pc-name" text-anchor="end" transform="translate(290.21 22.85)" style="fill: #fff; font-family: BankSansEFCY-MedConObl, &apos;Bank Sans EF CY Condensed&apos;; font-size: 25px;">{orangePlayers[0]?.name || ""}</text>
            <text id="pc-boost-3" data-name="pc-boost" transform="translate(15.07 24.74)" style="fill: #fff; font-family: BankSansEFCY-MedConObl, &apos;Bank Sans EF CY Condensed&apos;; font-size: 25px;">{orangePlayers[0]?.boost >= 0 ? orangePlayers[0]?.boost : ""}</text>
          </g>
        </g>
      </svg>
    </div>
</main>

<style>
    .inverted {
        transform: scaleX(-1);
    }

    .uninvert {
        transform-origin: center;
        transform: scaleX(1);
    }
</style>