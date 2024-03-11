<script>
    import { resize_to_fit } from "./resizeToFit.js";

    import { data, panelData, lTeam, rTeam, postGame } from "./socketio.js"

    import * as teamConfig from '../teamconfig.json'; 

    let clock;
    let time;
    let right1;
    let right2;
    let right3;
    let right4;
    let right5;
    let left1;
    let left2;
    let left3;
    let left4;
    let left5;

    $: {
        if(document.getElementById("left-name")){
            document.getElementById("left-name").style.fontSize = "52px"
            resize_to_fit(document.getElementById("left-name"), 300)
        }
        if(document.getElementById("right-name")){
            document.getElementById("right-name").style.fontSize = "52px"
            resize_to_fit(document.getElementById("right-name"),300)
        }
        if($panelData){
            if (right1 && right2 && right3 && right4 && left1 && left2 && left3 && left4) {
                if($panelData?.series === "Best of 9"){
                    right1.style.opacity = "1"
                    right2.style.opacity = "1"
                    right3.style.opacity = "1"
                    right4.style.opacity = "1"
                    right5.style.opacity = "1"
                    left1.style.opacity = "1"
                    left2.style.opacity = "1"
                    left3.style.opacity = "1"
                    left4.style.opacity = "1"
                    left5.style.opacity = "1"
                }
                if($panelData?.series === "Best of 7"){
                    right1.style.opacity = "1"
                    right2.style.opacity = "1"
                    right3.style.opacity = "1"
                    right4.style.opacity = "1"
                    right5.style.opacity = "0"
                    left1.style.opacity = "1"
                    left2.style.opacity = "1"
                    left3.style.opacity = "1"
                    left4.style.opacity = "1"
                    left5.style.opacity = "0"
                }
                if($panelData?.series === "Best of 5"){
                    right1.style.opacity = "1"
                    right2.style.opacity = "1"
                    right3.style.opacity = "1"
                    right4.style.opacity = "0"
                    right5.style.opacity = "0"
                    left1.style.opacity = "1"
                    left2.style.opacity = "1"
                    left3.style.opacity = "1"
                    left4.style.opacity = "0"
                    left5.style.opacity = "0"
                }
                if($panelData?.series === "Best of 3"){``
                    right1.style.opacity = "1"
                    right2.style.opacity = "1"
                    right3.style.opacity = "0"
                    right4.style.opacity = "0"
                    right5.style.opacity = "0"
                    left1.style.opacity = "1"
                    left2.style.opacity = "1"
                    left3.style.opacity = "0"
                    left4.style.opacity = "0"
                    left5.style.opacity = "0"
                }
                if($panelData?.series === "Best of 1"){
                    right1.style.opacity = "0"
                    right2.style.opacity = "0"
                    right3.style.opacity = "0"
                    right4.style.opacity = "0"
                    right5.style.opacity = "0"
                    left1.style.opacity = "0"
                    left2.style.opacity = "0"
                    left3.style.opacity = "0"
                    left4.style.opacity = "0"
                    left5.style.opacity = "0"
                }
            }
            if (right1 && right2 && right3 && right4 && right5 && $panelData?.orngScore != "") {
                let list = [right1, right2, right3, right4, right5]
                for(let x = 0; x<parseInt($panelData?.orngScore); x++){
                    list[x].style.fill = "#fff"
                }
                for(let x = parseInt($panelData?.orngScore); x<5; x++){
                    list[x].style.fill = "#05080E"
                }
            }
            if (left1 && left2 && left3 && left4 && left5 && $panelData?.blueScore != "") {
                let list = [left1, left2, left3, left4, left5]
                for(let x = 0; x<parseInt($panelData?.blueScore); x++){
                    list[x].style.fill = "#fff"
                }
                for(let x = parseInt($panelData?.blueScore); x<5; x++){
                    list[x].style.fill = "#05080E"
                }
            }
        }
        clock = $data?.fullData?.game?.time_seconds
        clock = clock == undefined ? 0 : clock;
        time = `${$data?.fullData?.game.isOT ? "+" : ""}` + `${Math.floor(clock/60)}` + ":" + `${(clock%60).toString().length == 1 ? "0" + (clock%60).toString() : (clock%60).toString()}`
    }
</script>

<main style="opacity: {!$postGame ? 1 : 0}">
    <svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" width="1021.92" height="131" transform="translate(433.5 0)" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1021.92 131">
        <defs>
            <linearGradient id="linear-gradient" x1="510.96" y1="117" x2="510.96" y2="1" gradientTransform="matrix(1, 0, 0, 1, 0, 0)" gradientUnits="userSpaceOnUse">
                <stop offset="0" stop-color="#192d3d"/>
                <stop offset="1" stop-color="#080b12"/>
            </linearGradient>
            <linearGradient id="linear-gradient-2" x1="176.96" y1="114" x2="176.96" y2="106" gradientTransform="matrix(1, 0, 0, 1, 0, 0)" gradientUnits="userSpaceOnUse">
                <stop offset="0" stop-color="#25435c"/>
                <stop offset=".15" stop-color="#1e374c"/>
                <stop offset=".5" stop-color="#121f2c"/>
                <stop offset=".8" stop-color="#0a1019"/>
                <stop offset="1" stop-color="#080b12"/>
            </linearGradient>
            <linearGradient id="linear-gradient-3" x1="228.96" x2="228.96" xlink:href="#linear-gradient-2"/>
            <linearGradient id="linear-gradient-4" x1="279.96" x2="279.96" xlink:href="#linear-gradient-2"/>
            <linearGradient id="linear-gradient-5" x1="330.96" x2="330.96" xlink:href="#linear-gradient-2"/>
            <linearGradient id="linear-gradient-6" x1="-5442.81" x2="-5442.81" gradientTransform="translate(-4599.41) rotate(-180) scale(1 -1)" xlink:href="#linear-gradient-2"/>
            <linearGradient id="linear-gradient-7" x1="-5392.37" x2="-5392.37" gradientTransform="translate(-4599.41) rotate(-180) scale(1 -1)" xlink:href="#linear-gradient-2"/>
            <linearGradient id="linear-gradient-8" x1="-5341.37" x2="-5341.37" gradientTransform="translate(-4599.41) rotate(-180) scale(1 -1)" xlink:href="#linear-gradient-2"/>
            <linearGradient id="linear-gradient-9" x1="-5290.37" x2="-5290.37" gradientTransform="translate(-4599.41) rotate(-180) scale(1 -1)" xlink:href="#linear-gradient-2"/>
            <linearGradient id="linear-gradient-10" x1="510.96" y1="131" x2="510.96" y2="101" gradientTransform="matrix(1, 0, 0, 1, 0, 0)" gradientUnits="userSpaceOnUse">
                <stop offset="0" stop-color="#192d3d"/>
                <stop offset=".18" stop-color="#142431"/>
                <stop offset=".7" stop-color="#080d13"/>
                <stop offset="1" stop-color="#040508"/>
            </linearGradient>
            <linearGradient id="linear-gradient-11" x1="-6214.38" y1="100" x2="-6214.38" y2="35" gradientTransform="translate(-6148.41) rotate(-180) scale(1 -1)" gradientUnits="userSpaceOnUse">
                <stop offset="0" stop-color="#192d3d"/>
                <stop offset="1" stop-color="#080b12"/>
            </linearGradient>
            <linearGradient id="linear-gradient-12" x1="238.29" y1="115.85" x2="243.69" y2="64.47" gradientTransform="matrix(1, 0, 0, 1, 0, 0)" gradientUnits="userSpaceOnUse">
                <stop offset="0" stop-color={teamConfig["teams"][$lTeam]["colors"]["namebox-light"]}/>
                <stop offset="1" stop-color={teamConfig["teams"][$lTeam]["colors"]["namebox-dark"]}/>
            </linearGradient>
            <linearGradient id="linear-gradient-13" x1="262.5" y1="101" x2="262.5" y2="34" gradientTransform="matrix(1, 0, 0, 1, 0, 0)" gradientUnits="userSpaceOnUse">
                <stop offset="0" stop-color={teamConfig["teams"][$lTeam]["colors"]["scorebox-light"]}/>
                <stop offset="1" stop-color={teamConfig["teams"][$lTeam]["colors"]["scorebox-dark"]}/>
            </linearGradient>
            <linearGradient id="linear-gradient-14" x1="-125.06" y1="100" x2="-125.06" y2="35" gradientTransform="translate(1081)" xlink:href="#linear-gradient"/>
            <linearGradient id="linear-gradient-15" x1="-4302.04" y1="115.85" x2="-4295.3" y2="51.76" gradientTransform="translate(-3518.41) rotate(-180) scale(1 -1)" gradientUnits="userSpaceOnUse">
                <stop offset="0" stop-color={teamConfig["teams"][$rTeam]["colors"]["namebox-light"]}/>
                <stop offset="1" stop-color={teamConfig["teams"][$rTeam]["colors"]["namebox-dark"]}/>
            </linearGradient>
            <linearGradient id="linear-gradient-16" x1="-4277.83" y1="101" x2="-4277.83" y2="34" gradientTransform="translate(-3518.41) rotate(-180) scale(1 -1)" gradientUnits="userSpaceOnUse">
                <stop offset="0" stop-color={teamConfig["teams"][$rTeam]["colors"]["scorebox-light"]}/>
                <stop offset="1" stop-color={teamConfig["teams"][$rTeam]["colors"]["scorebox-dark"]}/>
            </linearGradient>
            </defs>
            <g id="export-group">
                <g id="Scoreboard">
                <g id="scoreboard-bg">
                    <polygon points="99.85 117 86.09 1 935.83 1 922.07 117 99.85 117" style="fill: url(#linear-gradient);"/>
                    <path d="M934.71,2l-13.53,114H100.74L87.21,2H934.71m2.25-2H84.96l14,118H922.96L936.96,0h0Z" style="fill: #192d3d;"/>
                </g>
                <g id="left-wins">
                    <polygon id="left-win-5" bind:this={left5} points="156.96 106 158.96 114 196.96 114 194.96 106 156.96 106" transform="translate(-50 0)" style="fill: #05080E;"/>
                    <polygon id="left-win-4" bind:this={left4} points="156.96 106 158.96 114 196.96 114 194.96 106 156.96 106" style="fill: #05080E;"/>
                    <polygon id="left-win-3" bind:this={left3} points="208.96 106 210.96 114 248.96 114 246.96 106 208.96 106" style="fill: #05080E;"/>
                    <polygon id="left-win-2" bind:this={left2} points="259.96 106 261.96 114 299.96 114 297.96 106 259.96 106" style="fill: #05080E;"/>
                    <polygon id="left-win-1" bind:this={left1} points="310.96 106 312.96 114 350.96 114 348.96 106 310.96 106" style="fill: #05080E;"/>
                </g>
                <g id="right-wins">
                    <polygon id="right-win-5" bind:this={right5} points="863.4 106 861.4 114 823.4 114 825.4 106 863.4 106" transform="translate(50 0)" style="fill: #05080E;"/>
                    <polygon id="right-win-4" bind:this={right4} points="863.4 106 861.4 114 823.4 114 825.4 106 863.4 106" style="fill: #05080E;"/>
                    <polygon id="right-win-3" bind:this={right3} points="812.96 106 810.96 114 772.96 114 774.96 106 812.96 106" style="fill: #05080E;"/>
                    <polygon id="right-win-2" bind:this={right2} points="761.96 106 759.96 114 721.96 114 723.96 106 761.96 106" style="fill: #05080E;"/>
                    <polygon id="right-win-1" bind:this={right1} points="710.96 106 708.96 114 670.96 114 672.96 106 710.96 106" style="fill: #05080E;"/>
                </g>
                <g id="series-info">
                    <polygon id="series-info-box" points="507.96 101 499.96 101 361.96 101 364.96 131 499.96 131 507.96 131 656.96 131 659.96 101 507.96 101" style="fill: url(#linear-gradient-10);"/>
                    <text id="series-type" transform="translate(521.45 124.27)" style="fill: #fff; font-family: BankSansEFCY-MedConObl, &apos;Bank Sans EF CY Condensed&apos;; font-size: 25px;">{$panelData?.series.toUpperCase()}</text>
                    <text id="game-number" transform="translate(391.68 124.27)" style="fill: #fff; font-family: BankSansEFCY-MedConObl, &apos;Bank Sans EF CY Condensed&apos;; font-size: 25px;">GAME {parseInt($panelData?.blueScore) + parseInt($panelData?.orngScore) + 1 >= parseInt($panelData?.series[8]) ?  parseInt($panelData?.series[8]) : parseInt($panelData?.blueScore) + parseInt($panelData?.orngScore) + 1 || "1"}</text>
                </g>
                <g id="lines">
                    <line x1="510.96" y1="103" x2="510.96" y2="129" style="fill: #fff; stroke: #fff; stroke-miterlimit: 10; stroke-width: 1.5px;"/>
                    <line x1="366.96" y1="3" x2="366.96" y2="29" style="fill: #fff; stroke: #fff; stroke-miterlimit: 10; stroke-width: 1.5px;"/>
                    <line x1="649.96" y1="3" x2="649.96" y2="29" style="fill: #fff; stroke: #fff; stroke-miterlimit: 10; stroke-width: 1.5px;"/>
                </g>
                <text id="clock" text-anchor="middle" transform="translate(511.14 87)" style="fill: #fff; font-family: BankSansEFCY-MedConObl, &apos;Bank Sans EF CY Condensed&apos;; font-size: 50px;">{time}</text>
                <g id="left-background">
                    <g id="left-logo-box">
                        <path d="M13.46,100c-3.17,0-5.81-2.38-6.14-5.53L1.11,35H121.14l9.7,65H13.46Z" style="fill: url(#linear-gradient-11);"/>
                        <path d="M120.28,36l9.4,63H13.46c-2.66,0-4.87-1.99-5.14-4.63L2.22,36H120.28m1.72-2H0l6.33,60.58c.38,3.65,3.46,6.42,7.13,6.42h118.54l-10-67h0Z" style="fill: {teamConfig["teams"][$lTeam]["colors"]["scorebox-light"]};"/>
                    </g>
                    <polygon id="left-name-box" points="97 101 397 101 391 37 89.42 37 97 101" style="fill: url(#linear-gradient-12);"/>
                    <polygon id="left-score-box" points="89 34 429 34 436 101 361 101 355 42 90 42 89 34" style="fill: url(#linear-gradient-13);"/>
                </g>
                <g id="left-foreground">
                    <image id="left-logo" width="48" height="48" transform="translate(23.51 43.71)" xlink:href={teamConfig["teams"][$lTeam]["logo"]}/>
                    <text id="left-team-name" text-anchor="middle" transform="translate(223.86 86.51)" style="fill: #fff; font-family: BankSansEFCY-MedConObl, &apos;Bank Sans EF CY Condensed&apos;; font-size: 45px; stroke: #fff; stroke-miterlimit: 10;">{teamConfig["teams"][$lTeam]["name"].toUpperCase()}</text>
                    <text id="left-score" transform="translate(380.22 87)" style="fill: #fff; font-family: BankSansEFCY-MedConObl, &apos;Bank Sans EF CY Condensed&apos;; font-size: 50px;">{$data?.teamData[0]?.score == undefined ? "0" : $data?.teamData[0].score}</text>
                </g>
                <g id="right-background">
                    <g id="right-logo-box">
                        <path d="M891.08,100l9.7-65h120.03l-6.21,59.47c-.33,3.15-2.97,5.53-6.14,5.53h-117.38Z" style="fill: url(#linear-gradient-14);"/>
                        <path d="M1019.7,36l-6.1,58.37c-.28,2.64-2.49,4.63-5.14,4.63h-116.22l9.4-63h118.06m2.22-2h-122l-10,67h118.54c3.67,0,6.75-2.77,7.13-6.42l6.33-60.58h0Z" style="fill: {teamConfig["teams"][$rTeam]["colors"]["scorebox-light"]};"/>
                    </g>
                    <polygon id="right-name-box" points="924.92 101 624.92 101 630.92 37 932.5 37 924.92 101" style="fill: url(#linear-gradient-15);"/>
                    <polygon id="right-score-box" points="932.92 34 592.92 34 585.92 101 660.92 101 666.92 42 931.92 42 932.92 34" style="fill: url(#linear-gradient-16);"/>
                </g>
                <g id="right-foreground">
                <image id="right-logo" width="55" height="55" transform="translate(946.69 39.5)" xlink:href={teamConfig["teams"][$rTeam]["logo"]}/>
                    <text id="right-team-name" text-anchor="middle" transform="translate(796.09 86.5) rotate(-.04)" style="fill: #fff; font-family: BankSansEFCY-MedConObl, &apos;Bank Sans EF CY Condensed&apos;; font-size: 45px; stroke: #fff; stroke-miterlimit: 10;">{teamConfig["teams"][$rTeam]["name"].toUpperCase()}</text>
                    <text id="right-score" transform="translate(608.7 87)" style="fill: #fff; font-family: BankSansEFCY-MedConObl, &apos;Bank Sans EF CY Condensed&apos;; font-size: 50px;">{$data?.teamData[1]?.score == undefined ? "0" : $data?.teamData[1]?.score}</text>
                </g>
            </g>
        </g>
    </svg>     
</main>

<style>
</style>