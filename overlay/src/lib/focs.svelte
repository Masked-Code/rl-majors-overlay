<script>
    import { onMount } from "svelte";
    import { data, panelData, isReplay, isInGame, stingerBool, lTeam, rTeam, postGame } from "./socketio.js";
    import { resize_to_fit } from "./resizeToFit.js";
    import { tweened } from "svelte/motion";
    import * as teamConfig from '../teamconfig.json'; 
    onMount(() => {
        console.log("focused card loaded");
    });
    let cssVarStyles;
    $: {
        cssVarStyles = `--circumference: ${568.6282703}; --offset: ${568.6282703 - $data?.targetData?.boost * .75 / 100 * 568.6282703}`;
        try {
            document.getElementById("Focs-name").style.fontSize = "46px";
        } catch {}
        if ($data?.gameData.target) {
            if ($data?.gameData.hasTarget == true) {
                resize_to_fit(document.getElementById("Focs-name"), 240);
            }
        }
    }
</script>
<main style="{cssVarStyles}">
    <div
        id="outer-focs"
        class="outer-focs"
        style="opacity: {!$isInGame || $isReplay || $stingerBool || $postGame
            ? 0
            : $data?.gameData?.hasTarget
            ? 1
            : 0}; transition: opacity .25s; bottom: 100px;"
    >
    <svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" width="1827.67" height="253.01" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1827.67 253.01">
        <defs>
          <radialGradient id="radial-gradient" cx="1725.67" cy="102" fx="1725.67" fy="102" r="100" gradientTransform="matrix(1, 0, 0, 1, 0, 0)" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#303030"/>
            <stop offset="1" stop-color="#080b12"/>
          </radialGradient>
          <radialGradient id="radial-gradient-2" cx="1725.44" cy="101.77" fx="1725.44" fy="101.77" r="83.77" xlink:href="#radial-gradient"/>
          <radialGradient id="radial-gradient-3" cx="1725.67" cy="102" fx="1725.67" fy="102" r="102" gradientTransform="matrix(1, 0, 0, 1, 0, 0)" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#303030"/>
            <stop offset="1" stop-color="#080b12"/>
          </radialGradient>
          <linearGradient id="focs-linear-gradient" x1="797.81" y1="4.47" x2="153.37" y2="418.3" gradientTransform="matrix(1, 0, 0, 1, 0, 0)" gradientUnits="userSpaceOnUse">
            <stop offset=".05" stop-color="#1a3042"/>
            <stop offset="1" stop-color="#080b12"/>
          </linearGradient>
          <linearGradient id="focs-linear-gradient-2" x1="125.5" y1="253" x2="125.5" y2="202" gradientTransform="matrix(1, 0, 0, 1, 0, 0)" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="{teamConfig["teams"][$data?.targetData?.team == 0 ? $lTeam : $rTeam]["colors"]["namebox-light"]}"/>
            <stop offset="1" stop-color="{teamConfig["teams"][$data?.targetData?.team == 0 ? $lTeam : $rTeam]["colors"]["namebox-dark"]}"/>
          </linearGradient>
          <linearGradient id="focs-linear-gradient-3" x1="0" y1="251.53" x2="901" y2="251.53" gradientTransform="matrix(1, 0, 0, 1, 0, 0)" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="{teamConfig["teams"][$data?.targetData?.team == 0 ? $lTeam : $rTeam]["colors"]["namebox-light"]}"/>
            <stop offset="1" stop-color="{teamConfig["teams"][$data?.targetData?.team == 0 ? $lTeam : $rTeam]["colors"]["namebox-dark"]}"/>
          </linearGradient>
        </defs>
        <g id="export-group">
            <g id="boost-meter">
                <rect x="1625.67" y="2" width="200" height="200" rx="100" ry="100" style="fill: url(#radial-gradient);"/>
                <circle cx="1725.67" cy="102" r="90.5" transform-origin="1725.67 102" class="progress-ring__circle" fill="transparent" style="stroke: {teamConfig["teams"][$data?.targetData?.team == 0 ? $lTeam : $rTeam]["colors"]["scorebox-light"]}; stroke-miterlimit: 10; stroke-width: 9px;"/>
                <rect x="1641.67" y="18" width="167.53" height="167.53" rx="83.77" ry="83.77" style="fill: url(#radial-gradient-2);"/>
                <rect x="1625.67" y="2" width="200" height="200" rx="100" ry="100" style="fill: none; stroke: url(#radial-gradient-3); stroke-miterlimit: 10; stroke-width: 4px;"/>
                <image xlink:href="{teamConfig["teams"][$data?.targetData?.team == 0 ? $lTeam : $rTeam]["logo"]}" width="100px" height="100px" opacity="0.8" transform="translate(1677.14 53.11)" />
                <text transform="translate(1727.14 118.11)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedConObl, &apos;Bank Sans EF CY Condensed&apos;; font-size: 56px;">{$data?.targetData?.boost ?? "0"}</text>
                <line x1="1725.67" y1="187.5" x2="1725.67" y2="196.5" style="fill: none; stroke: #fff; stroke-miterlimit: 10; stroke-width: 2px;"/>
                <line x1="1811.17" y1="101.77" x2="1820.17" y2="101.77" style="fill: none; stroke: #fff; stroke-miterlimit: 10; stroke-width: 2px;"/>
                <line x1="1631.17" y1="102" x2="1640.17" y2="102" style="fill: none; stroke: #fff; stroke-miterlimit: 10; stroke-width: 2px;"/>
                <line x1="1725.67" y1="7.5" x2="1725.67" y2="16.5" style="fill: none; stroke: #fff; stroke-miterlimit: 10; stroke-width: 2px;"/>
              </g>
          <g id="focs-card">
            <g id="focs-full-bg">
              <polygon points="1 252 1 203 905.87 203 900 249.94 900 252 1 252" style="fill: url(#focs-linear-gradient);"/>
              <path d="M904.73,204l-5.72,45.75-.02,.12v1.12H2v-47H904.73m2.27-2H0v51H901v-3l6-48h0Z" style="fill: #192d3d;"/>
            </g>
            <polygon id="focs-name-bg" points="0 202 251 202 245 253 0 253 0 202" style="fill: url(#focs-linear-gradient-2);"/>
            <line id="focs-bottom" y1="251.53" x2="901" y2="251.53" style="fill: url(#focs-linear-gradient-3); stroke: url(#focs-linear-gradient-2); stroke-miterlimit: 10; stroke-width: 2.97px;"/>
            <g id="focs-info">
              <g id="score-text">
                <text transform="translate(341.66 232.7)" style="fill: #fff; font-family: BankSansEFCY-MedConObl, &apos;Bank Sans EF CY Condensed&apos;; font-size: 17.21px; stroke: #fff; stroke-miterlimit: 10; stroke-width: .39px;"><tspan x="0" y="0">SCORE</tspan></text>
              </g>
              <g id="goals-text">
                <text transform="translate(463.66 232.7)" style="fill: #fff; font-family: BankSansEFCY-MedConObl, &apos;Bank Sans EF CY Condensed&apos;; font-size: 17.21px; stroke: #fff; stroke-miterlimit: 10; stroke-width: .39px;"><tspan x="0" y="0">GOALS</tspan></text>
              </g>
              <g id="shots-text">
                <text transform="translate(592.66 232.7)" style="fill: #fff; font-family: BankSansEFCY-MedConObl, &apos;Bank Sans EF CY Condensed&apos;; font-size: 17.21px; stroke: #fff; stroke-miterlimit: 10; stroke-width: .39px;"><tspan x="0" y="0">SHOTS</tspan></text>
              </g>
              <g id="assists-text">
                <text transform="translate(716.66 232.7)" style="fill: #fff; font-family: BankSansEFCY-MedConObl, &apos;Bank Sans EF CY Condensed&apos;; font-size: 17.21px; stroke: #fff; stroke-miterlimit: 10; stroke-width: .39px;"><tspan x="0" y="0">ASST</tspan></text>
              </g>
              <g id="saves-text">
                <text transform="translate(824.66 232.7)" style="fill: #fff; font-family: BankSansEFCY-MedConObl, &apos;Bank Sans EF CY Condensed&apos;; font-size: 17.21px; stroke: #fff; stroke-miterlimit: 10; stroke-width: .39px;"><tspan x="0" y="0">SAVES</tspan></text>
              </g>
              <text id="Focs-name" transform="translate(6.68 238.82)" style="fill: #fff; font-family: BankSansEFCY-MedConObl, &apos;Bank Sans EF CY Condensed&apos;; font-size: 46px;">{$data?.targetData?.name ?? ""}</text>
              <text id="score" transform="translate(337.55 236.7)" text-anchor="end" style="fill: #fff; font-family: BankSansEFCY-MedConObl, &apos;Bank Sans EF CY Condensed&apos;; font-size: 32px;">{$data?.targetData?.score ?? ""}</text>
              <text id="goals" transform="translate(460.72 236.7)" text-anchor="end" style="fill: #fff; font-family: BankSansEFCY-MedConObl, &apos;Bank Sans EF CY Condensed&apos;; font-size: 35px;">{$data?.targetData?.goals ?? ""}</text>
              <text id="shots" transform="translate(587.5 236.7)" text-anchor="end" style="fill: #fff; font-family: BankSansEFCY-MedConObl, &apos;Bank Sans EF CY Condensed&apos;; font-size: 35px;">{$data?.targetData?.shots ?? ""}</text>
              <text id="assists" transform="translate(712.15 236.7)" text-anchor="end" style="fill: #fff; font-family: BankSansEFCY-MedConObl, &apos;Bank Sans EF CY Condensed&apos;; font-size: 35px;">{$data?.targetData?.assists ?? ""}</text>
              <text id="saves" transform="translate(822.27 236.7)" text-anchor="end" style="fill: #fff; font-family: BankSansEFCY-MedConObl, &apos;Bank Sans EF CY Condensed&apos;; font-size: 35px;">{$data?.targetData?.saves ?? ""}</text>
            </g>
          </g>
        </g>
      </svg>
    </div>
</main>

<style>
    .outer-focs {
        position: absolute;
        top: 827px;
        left: 0px;
    }
    .progress-ring__circle {
        transition: stroke-dashoffset 0.25s;
        transform: rotate(0.25turn);
        stroke-dasharray: var(--circumference) var(--circumference);
        stroke-dashoffset: var(--offset);
    }
</style>