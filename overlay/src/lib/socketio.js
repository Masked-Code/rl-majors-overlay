import socketIOClient from 'socket.io-client';
import {writable, get, derived} from 'svelte/store';

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
    tickertext: "No Information",
    lineuptext: "Tonight's",
    screen: "overlay"
}
export const timerData = writable({
    time: 0,
    text: ""
});
export const duration = writable(30);
export const data = writable(null);
export const stingerBool = writable(false)
export const goalScored = writable(false)
export const animReset = writable(false)
export const isReplay = writable(false);
export const isInGame = writable(false);
export const lTeam = writable("rlpc");
export const rTeam = writable("nemesis");
export const postGame = writable(false);
export const sponsorList = writable(['./sponsors/frost_text.png']);
export let goalData = writable(defaultGoalData);
export const panelData = writable(defaultPanelData);
export var reset = false;

export const postgameData = writable({
    orangePlayers: [],
    bluePlayers: []
})

let mergeArrays = (arr1, arr2) => {
    //Creates an object map of id to object in arr1
    const arr1Map = arr1.reduce((acc, o) => {
        acc[o.id] = o;
        return acc;
    }, {});
    //Updates the object with corresponding id in arr1Map from arr2, 
    //creates a new object if none exists (upsert)
    arr2.forEach(o => {
        arr1Map[o.id] = o;
    });

    //Return the merged values in arr1Map as an array
    return Object.values(arr1Map);
}

export const createSocketConnection = () => {
    let isHudVisible = true;
    // instantiate socketIOClient connection to localhost
    const socket = socketIOClient('localhost:6969', {
        withCredentials: true,
    });

    socket.on('connect', () => {
        // emit join message to socket with client ID
        socket.emit('join', 'FRONTEND');
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
                screen: payload.data.contents.screen
            }
            let tickers = payload.data.contents.tickertext.split(",");
            let tickfinal = tickers.join("　")
            panelSendData.tickertext = tickfinal + "　";
            console.log(panelSendData)
            panelData.set(panelSendData)
            lTeam.set(payload.data.contents.blueName)
            rTeam.set(payload.data.contents.orngName)
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

    function rconSend(command) {
        socket.emit('RCON', {
            data: {
                command: command,
            },
        });
    }

    // on socket message 'update', run logic on that data
    socket.on('update', (update) => {
        console.log(update.event, update)
        // run socket logic here, e.g:
        if (update.event === 'game:update_state') {

            // Player Object Construction

            let players = update.data.players;
            let orangePlayers = [];
            let bluePlayers = [];

            Object.keys(players).map(id => {
                if (players[id].team == 1) {
                    if (players[id].name.length > 13) {
                        let shorten = players[id].name.split("").slice(0, 15)
                        shorten.push("...")

                        players[id].name = shorten.join('')
                    }
                    orangePlayers.push(players[id]);
                } else if (players[id].team == 0) {
                    if (players[id].name.length > 13) {
                        let shorten = players[id].name.split("").slice(0, 15)
                        shorten.push("...")

                        players[id].name = shorten.join('')
                    }
                    bluePlayers.push(players[id]);
                }
            })
            if(update.data.game.time_seconds <= 180){
                let pgdata = get(postgameData)
                pgdata.orangePlayers = mergeArrays(pgdata.orangePlayers, orangePlayers)
                pgdata.orangePlayers.sort((a, b) => a.score > b.score ? -1 : a.score < b.score ? 1 : 0);
                postgameData.set(pgdata)
                pgdata = get(postgameData)
                pgdata.bluePlayers = mergeArrays(pgdata.bluePlayers, bluePlayers)
                console.log(pgdata.bluePlayers, bluePlayers)
                pgdata.bluePlayers.sort((a, b) => a.score > b.score ? -1 : a.score < b.score ? 1 : 0);
                postgameData.set(pgdata)
            }

            let playerData = {
                orangeTeam: orangePlayers,
                blueTeam: bluePlayers
            };


            // Target Player Data construction

            let targetData;
            if (update.data.game.target) {
                let target = update.data.game.target;

                targetData = dataCheck(target);

                function dataCheck(target) {
                    for (let x = 0; x <= 3; x++) {
                        let z =
                            bluePlayers[x]?.id == target //If blue player x is target z = blue player x's data
                                ? bluePlayers[x]
                                : orangePlayers[x]?.id == target //If orange player x is target z = orange player x's data
                                    ? orangePlayers[x]
                                    : null; //else z is null
                        if (z != null) {
                            return z; // if z is not null return z
                        }
                    }
                }
            }

            if (update.data.time_seconds != 300 && update.data.game.hasWinner == false) {
                isInGame.set(true)
            }
            let sendData = {
                playerData: playerData,
                teamData: update.data.game.teams,
                gameData: update.data.game,
                fullData: update.data,
                targetData: targetData
            };
            data.set(sendData)
            //etc
            setTimeout(() => {
                reset = false;
            })
        }

        if (update.event === 'game:match_ended') {
            isHudVisible = true;
            isInGame.set(false)
        }

        if (update.event === 'game:post_countdown_begin') {
            //console.log("Hud Visibility = " + isHudVisible)
            rconSend('rcon_refresh_allowed');
            rconSend('replay_gui hud 1');
            rconSend('replay_gui matchinfo 1');
            isInGame.set(true)
            setTimeout(() => {
                //console.log("Hud Visibility = " + isHudVisible)
                rconSend('replay_gui hud 0');
                rconSend('replay_gui matchinfo 0');
                isHudVisible = false;
                // console.log("Hud Visibility = " + isHudVisible)
            }, 500);
            setTimeout(() => {
                goalData.set(defaultGoalData)
            }, 1000)
        }
        if (update.event === 'game:replay_start') {
            isReplay.set(true);
            goalScored.set(false)
        }
        if (update.event === 'game:goal_scored') {
            console.log(update)
            let scorer = update.data.scorer.name;
            let assister = update.data.assister.name;
            let teamnum = update.data.scorer.teamnum;
            let speed = `${Math.round(update.data.goalspeed)} KPH`

            if (scorer.length > 16) {
                let shorten = scorer.split("").slice(0, 15)
                shorten.push("...")

                scorer = shorten.join('')
            }

            if (assister.length > 16) {
                let shorten = assister.split("").slice(0, 15)
                shorten.push("...")

                assister = shorten.join('')
            }

            let sendData = {
                scorer: scorer,
                assister: assister,
                team: teamnum,
                speed: speed
            }
            console.log(`goal_scored` + sendData)
            goalData.set(sendData)
            goalScored.set(true)
        }
        if (update.event === 'game:goal_scored') {
            setTimeout(() => {
                stingerBool.set(true)
                setTimeout(() => {
                    stingerBool.set(false)
                }, 2500)
            }, 2500)
        }
        if (update.event === 'game:replay_end') {
            if (!get(stingerBool)) {
                stingerBool.set(true)
                setTimeout(() => {
                    stingerBool.set(false);
                    isReplay.set(false);
                }, 2500)
            }
        }
        if (update.event === 'game:replay_will_end') {
            setTimeout(() => {
                stingerBool.set(true);
            }, 2200)
            setTimeout(() => {
                stingerBool.set(false);
                isReplay.set(false);
            }, 4700)
        }
        if (update.event === 'game:podium_start'){
            console.log("podium", update)
            let udata = {
                data: {
                    event: "win_update",
                    contents: {
                       team: get(data).teamData[0].score - get(data).teamData[1].score > 0 ? 0 : 1
                    }
                }
            }
            socket.emit('payload', udata)
            
            setTimeout(() => {
                postGame.set(true);
            }, 5000)
        }
        if (update.event === 'game:match_created' || update.event === 'game:initialized' || update.event === 'game:post_countdown_begin'){
            postGame.set(false);
            postgameData.set({
                orangePlayers: [],
                bluePlayers: []
            })
        }
    });
}