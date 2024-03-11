<script>
    import { createPanelConnection, updateScreen, timerstart, timerstop, updateDuration } from "./scripts/socket";
    import { onMount } from "svelte";
    import DblBtn from "./components/buttons/dblBtn.svelte";
    import * as reset from "./scripts/reset-funcs";
    import DoubleInput from "./components/inputs/h-dbli.svelte";
    import WinCtr from "./components/inputs/win-ctr.svelte";
    import Matchup from "./components/inputs/matchup.svelte";
    import Caster from "./components/inputs/caster.svelte";
    

    onMount(() => {
        createPanelConnection();
    });
</script>

<main style="display: flex; color: white">
    <div>
        <div class="wrapper">
            <div style:display={"flex"}>
                <DblBtn
                    txtList={["UPDATE<br/>OVERLAY", "RESET<br/>WINS"]}
                    funcList={[updateScreen, reset.resetWins]}
                />
                <div style:padding-left="30px" style:display="grid" style:align-items="center" style:justify-items="center">
                    <div>Transparent Panel</div>
                    <select name="transparent" id="transparent">
                        <option value={1}>True</option>
                        <option value={0} selected>False</option>
                    </select>
                </div>
            </div>
            <div class="tabs">
                <div class="tab">
                    <input
                        type="radio"
                        name="css-tabs"
                        id="tab-1"
                        checked
                        class="tab-switch"
                    />
                    <label for="tab-1" class="tab-label">Pregame - Matchup Info</label>
                    <div class="tab-content" >
                        <div style="display: flex">
                            <Matchup matchupnum=1 />
                            <Matchup matchupnum=2 style="padding-left: 30px"/>
                            <Matchup matchupnum=3 style="padding-left: 30px"/>
                        </div>
                        <div style="display: flex">
                            <div>
                                <h5 style="margin: 0;">Bottom Orange Bar</h5>
                                <input id="bottomorangebar" type="text" style="width: 250px">
                            </div>
                            <div style="padding-left: 10px">
                                <h5 style="margin: 0;">Lineup Text</h5>
                                <input id="lineuptext" type="text" style="width: 250px" value="Tonight's">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab">
                    <input
                        type="radio"
                        name="css-tabs"
                        id="tab-2"
                        class="tab-switch"
                    />
                    <label for="tab-2" class="tab-label">Caster Info</label>
                    <div class="tab-content">
                        <div style="display: flex;">
                            <Caster num=1/>
                            <Caster num=2 style="padding-left: 30px"/>
                        </div>
                    </div>
                </div>
                <div class="tab">
                    <input
                        type="radio"
                        name="css-tabs"
                        id="tab-3"
                        class="tab-switch"
                    />
                    <label for="tab-3" class="tab-label">Pregame - Other Info</label>
                    <div class="tab-content">
                        <div style="display: flex;">
                            <div>
                                <label for="tickertext">Ticker Text</label>
                                <input type="text" id="tickertext">
                                <br>
                                <br>
                                <!-- timertext label and input -->
                                <label for="timertext">Timer Text</label>
                                <input type="text" id="timertext" value="Back In">
                                <br>
                                <br>
                                <!-- time length input -->
                                <label for="timelength">Time Length (In Minutes)</label>
                                <input type="number" id="timelength" value=5>
                                <!-- timer start button -->
                                <br>
                                <br>
                                <button id="timerstart" on:click="{timerstart}" >Start Timer</button>
                                <button id="timerdel" on:click="{timerstop}" style="margin-left: 20px" >Remove Timer</button>
                            </div>
                            <div class="slider">
                                <input id="dur-slider" type="range" min="0" max="100" value="30" oninput="rangeValue.innerText = this.value;" on:input="{updateDuration}">
                                <p id="rangeValue">30</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab">
                    <input
                        type="radio"
                        name="css-tabs"
                        id="tab-4"
                        class="tab-switch"
                    />
                    <label for="tab-4" class="tab-label">Game Setup</label>
                    <div class="tab-content">
                        <div class="series">Series Info</div>
                        <select id="series-length">
                            <option value="Best of 1">Best of 1</option>
                            <option value="Best of 3">Best of 3</option>
                            <option value="Best of 5" selected>Best of 5</option
                            >
                            <option value="Best of 7">Best of 7</option>
                            <option value="Best of 9">Best of 9</option>
                        </select>
                        <DoubleInput
                            title="Team Names"
                            liid={["blue-name", "orng-name"]}
                            ltxt={[
                                "Input Blue Name Here",
                                "Input Orange Name Here",
                            ]}
                            lclr={["lightskyblue", "orange"]}
                        />
                        <WinCtr />
                    </div>
                </div>
            </div>
        </div>
    </div>
    &width=379&height=596
</main>

<style>
    .series {
        font-size: 24px;
        font-weight: 600;
    }
    * {
        box-sizing: border-box;
    }
    body {
        font-family: "Open Sans";
        background: #2c3e50;
        color: #ecf0f1;
        line-height: 1.618em;
    }
    .wrapper {
        max-width: 50rem;
        width: 150%;
        margin: 0 auto;
    }
    .tabs {
        position: relative;
        margin: 3rem 0;
        background: #1abc9c;
        /* height: 23rem; */
        height: auto;
    }
    .tabs::before,
    .tabs::after {
        content: "";
        display: table;
    }
    .tabs::after {
        clear: both;
    }
    .tab {
        float: left;
    }
    .tab-switch {
        display: none;
    }
    .tab-label {
        position: relative;
        display: block;
        line-height: 2.75em;
        height: 3em;
        padding: 0 1.618em;
        background: #1abc9c;
        border-right: 0.125rem solid #16a085;
        color: rgb(255, 255, 255);
        cursor: pointer;
        top: 0;
        transition: all 0.25s;
    }
    .tab-label:hover {
        top: -0.25rem;
        transition: top 0.25s;
    }
    .tab-content {
        /* height: 20.3rem; */
        height: auto;
        /* min-height: 12rem; */
        position: absolute;
        max-width: 60rem;
        width: 100%;
        z-index: 1;
        top: 2.75em;
        left: 0;
        padding: 1.618rem;
        background: rgb(40, 40, 40);
        color: #fff;
        border-bottom: 0.25rem solid #bdc3c7;
        opacity: 0;
        transition: all 0.35s;
    }
    .tab-switch:checked + .tab-label {
        background: rgb(40, 40, 40);
        color: #ffffff;
        border-bottom: 0;
        border-right: 0.125rem solid #fff;
        transition: all 0.35s;
        z-index: 1;
        top: -0.0625rem;
    }
    .tab-switch:checked + label + .tab-content {
        z-index: 2;
        opacity: 1;
        transition: all 0.35s;
    }
    .slider input[type="range"] {
    -webkit-appearance:none !important;
        width: 220px;
        height: 2px;
        background: black;
        border: none;
        outline: none;
    }
    .slider input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none !important;
        width: 15px;
        height:15px;
        background: white;
        border: 2px solid white;
        border-radius: 50%;
        cursor: pointer;
    }
    .slider input[type="range"]::-webkit-slider-thumb:hover {
        background: black;
    }
</style>
