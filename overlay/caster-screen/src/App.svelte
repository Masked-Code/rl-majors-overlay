<script>
    import { onMount } from 'svelte';
    import Pregame from './pregame/pregame.svelte';
    import { createSocketConnection } from './socketio';

  onMount(() => {
    createSocketConnection();
  })
</script>

<main>
  <Pregame />
</main>

<style>
</style>
