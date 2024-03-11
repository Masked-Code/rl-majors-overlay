<script>
    export let matchupnum;
    export let style = "";

    import { teamlist } from "../../scripts/socket.js";
</script>

<div style="{style}">
    <h3 style="margin: 5px 0; border-bottom: 2px solid white; ">Matchup {matchupnum}</h3>
    <h5 style="margin: 0; font-size: 17px">Bracket</h5>
    <select id="bracket-name-{matchupnum}" style="width: 150px">
        <option value="" selected></option>
        <option value="Upper">Upper Bracket</option>
        <option value="Lower">Lower Bracket</option>
    </select>
    <h5 style="margin: 0;">Round</h5>
    <input id="bracket-round-{matchupnum}" style="width: 150px" />
    <h5 style="margin: 0;">Team 1 Name</h5>
    <select id="team1-name-{matchupnum}" style="width: 150px">
        <option value="" selected></option>
        {#each $teamlist as name}
            <option value="{name}">{name}</option>
        {/each}
    </select>
    <h5 style="margin: 0;">Team 2 Name</h5>
    <select id="team2-name-{matchupnum}" style="width: 150px">
        <option value="" selected></option>
        {#each $teamlist as name}
            <option value="{name}">{name}</option>
        {/each}
    </select>
</div>