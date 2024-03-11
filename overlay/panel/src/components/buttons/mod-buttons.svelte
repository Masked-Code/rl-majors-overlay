<script>
    export let btnTxt;
    export let clickHandler;
</script>
<main>
    <button on:click={clickHandler} class="mod-btn">{@html btnTxt}</button>
</main>

<style>
    .mod-btn {
        border: 3px solid #1abc9c;
        font-weight: bold;
        font-family: integral-reg;
        width: 193px;
        margin-right: 20px
    }
</style>