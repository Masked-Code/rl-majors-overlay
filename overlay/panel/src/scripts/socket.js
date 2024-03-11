import socketIOClient from 'socket.io-client';
import { readable } from 'svelte/store';
import * as teamConfig from "../teamconfig.json";
let socket;
export const createPanelConnection = () => {
    socket = socketIOClient('localhost:6969', {
        withCredentials: true,
    });
    socket.on("connect", () => {
        socket.emit("Control Panel Connected");
        socket.emit('watchGame');
    });
    socket.on('update', (update) => {
        if (update.event === "game:initialized") {
            console.log(update);
            updateScreen();
        }
    })
    socket.on('payload', (update) => {
        if(update.data.event === "win_update"){
            console.log("podium", update)
            update.data.contents.team == "0" ? document.getElementById("blueWins").value = parseInt(document.getElementById("blueWins").value) + 1 : document.getElementById("orngWins").value =  parseInt(document.getElementById("orngWins").value) + 1;
            updateScreen();
        }
    })
}

export const updateScreen = () => {
    let data = {
        data: {
            event: "ctrl_update",
            contents: {
                seriesLength: document.getElementById("series-length").value,
                blueScore: document.getElementById("blueWins").value,
                orngScore: document.getElementById("orngWins").value,
                orngName: document.getElementById("orng-name").value,
                blueName: document.getElementById("blue-name").value,
                bracket1: document.getElementById("bracket-name-1").value,
                bracket2: document.getElementById("bracket-name-2").value,
                bracket3: document.getElementById("bracket-name-3").value,
                teamname11: document.getElementById("team1-name-1").value,
                teamname12: document.getElementById("team1-name-2").value,
                teamname13: document.getElementById("team1-name-3").value,
                teamname21: document.getElementById("team2-name-1").value,
                teamname22: document.getElementById("team2-name-2").value,
                teamname23: document.getElementById("team2-name-3").value,
                bottomorangebar: document.getElementById("bottomorangebar").value,
                caster1url: document.getElementById("caster1url").value,
                caster1name: document.getElementById("caster1name").value,
                caster1twitter: document.getElementById("caster1twitter").value,
                caster2url: document.getElementById("caster2url").value,
                caster2name: document.getElementById("caster2name").value,
                caster2twitter: document.getElementById("caster2twitter").value,
                tickertext: document.getElementById("tickertext").value,
                lineuptext: document.getElementById("lineuptext").value,
                bracketround1: document.getElementById("bracket-round-1").value,
                bracketround2: document.getElementById("bracket-round-2").value,
                bracketround3: document.getElementById("bracket-round-3").value,
                transparent: parseInt(document.getElementById("transparent").value)
            },
        },
    };
    console.log(data);
    socket.emit("payload", data);
}
export const updateDuration = () => {
    let data = {
        data: {
            event: "duration_update",
            contents: {
                duration: document.getElementById("dur-slider").value,
            },
        },
    }
    socket.emit("payload", data);
}
export const teamlist = readable(null, set => {
    let arr = [];
    for (let team in teamConfig["teams"]){
        arr.push(teamConfig["teams"][team]["name"])
    }
    return set(arr);
});
export const timerstart = () => {
    let data = {
        data: {
            event: "timer_start",
            contents: {
                time: document.getElementById("timelength").value,
                text: document.getElementById("timertext").value
            },
        },
    };
    console.log("payload", data)
    socket.emit("payload", data);
}
export const timerstop = () => {
    let data = {
        data: {
            event: "timer_stop"
        }
    }
    socket.emit("payload", data);
}