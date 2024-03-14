import socketIOClient from 'socket.io-client';
import { writable } from 'svelte/store';

let defaultGoalData = {
    scorer: "",
    assister: "",
    team: 0,
    speed: "0 KPH"
}
let defaultPanelData = {
    series: "BEST OF 5",
    orngName: "nemesis",
    blueName: "rlpc",
    blueScore: 0,
    orngScore: 0,
    division1: "Upper",
    division2: "Upper",
    division3: "Upper",
    teamname11: "nemesis",
    teamname12: "nemesis",
    teamname13: "nemesis",
    teamname21: "frontline",
    teamname22: "frontline",
    teamname23: "frontline",
    bottomorangebar: "",
    caster1url: "",
    caster1name: "",
    caster1twitter: "",
    caster2url: "",
    caster2name: "",
    caster2twitter: "",
    tickertext: "",
    lineuptext: "Tonight's",
    screen: "overlay",
    transparent: 0
}
export const timerData = writable({
    time: 0,
    text: ""
});
export const duration = writable(30);
export const panelData = writable(defaultPanelData);
export var reset = false;

export const createSocketConnection = () => {
    let isHudVisible = true;
    // instantiate socketIOClient connection to localhost
    const socket = socketIOClient('localhost:6969', {
        withCredentials: true,
    });

    socket.on('connect', () => {
        // emit join message to socket with client ID
        socket.emit('join', 'CASTER');
        /* emit watchGame message to socket, required for backend server to
        create and destroy stream on per client ID basis */
        socket.emit('watchGame');
        console.log("Connected To Socket")
    });

    socket.on('payload', (payload) => {
        console.log(payload);
        //panel data
        if (payload.data.event === "ctrl_update") {
            let panelSendData = {
                series: payload.data.contents.seriesLength,
                blueScore: payload.data.contents.blueScore,
                orngScore: payload.data.contents.orngScore,
                orngName: payload.data.contents.orngName,
                blueName: payload.data.contents.blueName,
                division1: payload.data.contents.division1,
                division2: payload.data.contents.division2,
                division3: payload.data.contents.division3,
                teamname11: payload.data.contents.teamname11,
                teamname12: payload.data.contents.teamname12,
                teamname13: payload.data.contents.teamname13,
                teamname21: payload.data.contents.teamname21,
                teamname22: payload.data.contents.teamname22,
                teamname23: payload.data.contents.teamname23,
                bottomorangebar: payload.data.contents.bottomorangebar,
                caster1url: payload.data.contents.caster1url,
                caster1name: payload.data.contents.caster1name,
                caster1twitter: payload.data.contents.caster1twitter,
                caster2url: payload.data.contents.caster2url,
                caster2name: payload.data.contents.caster2name,
                caster2twitter: payload.data.contents.caster2twitter,
                tickertext: payload.data.contents.tickertext,
                lineuptext: payload.data.contents.lineuptext,
                divisionround1: payload.data.contents.divisionround1,
                divisionround2: payload.data.contents.divisionround2,
                divisionround3: payload.data.contents.divisionround3,
                screen: payload.data.contents.screen,
                transparent: payload.data.contents.transparent
            }
            let tickers = payload.data.contents.tickertext.split(",");
            let tickfinal = tickers.join("　")
            panelSendData.tickertext = tickfinal + "　";
            console.log(panelSendData)
            panelData.set(panelSendData)
        }

        if (payload.data.event === "timer_start"){
            let timerSendData = {
                text: payload.data.contents.text,
                time: payload.data.contents.time
            }
            console.log(timerSendData)
            timerData.set(timerSendData)
        }

        if (payload.data.event === "timer_stop"){
            timerData.set({
                time: 0,
                text: ""
            });
            console.log("Timer Stopped")
        }

        if (payload.data.event === "duration_update"){
            duration.set(payload.data.contents.duration)
        }
    });
}