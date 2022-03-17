<script>
  import "../global.css"
  import Queue from "../app/parts/queue/Queue.svelte"
</script>

<svelte:head>
  <title>10queue</title>
</svelte:head>

<div id="body">
  <h1>Task queue</h1>
  <Queue />
</div>

<style>
  #body {
    padding: 0 2rem;
  }

  h1 {
    text-transform: uppercase;
  }
</style>
