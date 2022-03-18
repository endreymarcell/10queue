<script>
  import { onMount } from "svelte"
  import "../global.css"
  import Queue from "../app/parts/queue/Queue.svelte"
  import { dispatcher, store } from "../app/logic/appLogic"

  onMount(() => {
    dispatcher.init()
  })
</script>

<svelte:head>
  <title>10queue</title>
</svelte:head>

<div id="body">
  <h1>Task queue{$store.hasUnsavedChanged ? "*" : ""}</h1>
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
