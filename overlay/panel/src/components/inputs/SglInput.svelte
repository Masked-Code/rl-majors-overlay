<script>
    export let iid;
    export let itxt;
    export let iclr;
    import * as teamConfig from "../../teamconfig.json"
    let teamlist = []
    for (let team in teamConfig["teams"]){
        teamlist.push(teamConfig["teams"][team]["name"])
    }
</script>

<main class={$$props.class}>
    <label for="{iid}" style="color: {iclr}">{itxt}</label>
    <select type="text" id="{iid}">
        {#each teamlist as name}
            <option value="{name}">{name}</option>
        {/each}
    </select>
</main>

<style>
</style>