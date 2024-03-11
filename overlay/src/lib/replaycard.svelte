<script>
    import { data, panelData, isReplay, isInGame, stingerBool, goalData, lTeam, rTeam } from "./socketio.js";
    import { resize_to_fit } from "./resizeToFit.js";
    import * as teamConfig from "../teamconfig.json"

    $: {
        if (
            $data &&
            document.getElementById("outer-replay") &&
            document.getElementById("outer-replay").style.opacity == "1"
        ) {
            resize_to_fit(document.getElementById("replay-card-name"), 200);
            resize_to_fit(
                document.getElementById("replay-card-assist-name"),
                200
            );
        }
        if($stingerBool && document.getElementById("outer-replay")){
            document.getElementById("outer-replay").style.opacity = "0"
        }
        if(!$stingerBool && document.getElementById("outer-replay") && $isInGame && $isReplay){
            document.getElementById("outer-replay").style.opacity = "1"
        }
    }
</script>

<main>
    <div
        id="outer-replay"
        class="outer-replay"
        style="opacity: {!$isInGame || $stingerBool || !$isReplay
            ? 0
            : 1}; transition: opacity .1s; transform: scale(.9)"
    >
        <div class="replay">
            REPLAY &bull;
        </div>
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
              <g id="focs-card">
                <g id="focs-full-bg" style="transform: scaleX(.75)">
                  <polygon points="1 252 1 203 905.87 203 900 249.94 900 252 1 252" style="fill: url(#focs-linear-gradient);"/>
                  <path d="M904.73,204l-5.72,45.75-.02,.12v1.12H2v-47H904.73m2.27-2H0v51H901v-3l6-48h0Z" style="fill: #192d3d;"/>
                  <polygon id="focs-name-bg" points="0 202 251 202 245 253 0 253 0 202" style="fill: url(#focs-linear-gradient-2);"/>
                  <line id="focs-bottom" y1="251.53" x2="901" y2="251.53" style="fill: url(#focs-linear-gradient-3); stroke: url(#focs-linear-gradient-2); stroke-miterlimit: 10; stroke-width: 2.97px;"/>
                </g>
                <g id="focs-info">
                  <g id="assister-text">
                    <text transform="translate(363.66 232.7)" style="fill: #fff; font-family: BankSansEFCY-MedConObl, &apos;Bank Sans EF CY Condensed&apos;; font-size: 17.21px; stroke: #fff; stroke-miterlimit: 10; stroke-width: .39px;"><tspan x="0" y="0">{$goalData?.assister ? "ASSIST" : ""}</tspan></text>
                  </g>
                  <g id="goalspeed-text">
                    <text transform="translate(600.66 232.7)" style="fill: #fff; font-family: BankSansEFCY-MedConObl, &apos;Bank Sans EF CY Condensed&apos;; font-size: 17.21px; stroke: #fff; stroke-miterlimit: 10; stroke-width: .39px;"><tspan x="0" y="0">SPEED</tspan></text>
                  </g>
                  <text id="replay-name" transform="translate(1.68 238.82)" style="fill: #fff; font-family: BankSansEFCY-MedConObl, &apos;Bank Sans EF CY Condensed&apos;; font-size: 46px;">{$goalData?.scorer ?? ""}</text>
                  <text id="assister-name" transform="translate(350.72 236.7)" text-anchor="end" style="fill: #fff; font-family: BankSansEFCY-MedConObl, &apos;Bank Sans EF CY Condensed&apos;; font-size: 35px;">{$goalData?.assister ?? ""}</text>
                  <text id="goalspeed" transform="translate(595.27 236.7)" text-anchor="end" style="fill: #fff; font-family: BankSansEFCY-MedConObl, &apos;Bank Sans EF CY Condensed&apos;; font-size: 35px;">{$goalData?.speed ?? ""}</text>
                </g>
              </g>
            </g>
          </svg>
    </div>
</main>

<style>
    .outer-replay {
        position: absolute;
        top: 790px;
        left: -93px;
    }

    .replay {
        color: red;
        opacity: .8;
        font-family: akira-expanded;
        font-weight: bold;
        font-size: 40px;
        position: relative;
        bottom: 600px;
        left: 15px;
    }
</style>
