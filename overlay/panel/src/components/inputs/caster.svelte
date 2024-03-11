<script>
    export let num;
    export let style = "";
</script>

<div style={style}>
    <h3 style="margin: 0; border-bottom: 2px solid white">Caster {num}</h3>
    <label for="caster{num}url">Webcam URL</label>
    <input type="url" id="caster{num}url" />

    <label for="caster{num}name">Name</label>
    <input type="text" id="caster{num}name" />

    <label for="caster1{num}twitter">Twitter</label>
    <input type="text" id="caster{num}twitter" />
</div>