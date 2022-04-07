<script lang="ts">
  import { dispatcher, store } from "../logic/appLogic"
  const onClick = () => dispatcher.addTaskAtEndRequested()
  $: canCreateNewTask = $store.tasks.length < 10
</script>

<button id="create-task" on:click={onClick} class:disabled={!canCreateNewTask}>+</button>

<style>
  button {
    --size: 4rem;
    --margin: 1.2rem;

    width: var(--size);
    height: var(--size);
    position: fixed;
    bottom: var(--margin);
    right: var(--margin);
    border-radius: 50%;
    border: none;
    font-size: 2rem;
    color: white;
    background-color: coral;
    cursor: pointer;
  }

  @media screen and (min-width: 500px) {
    button {
      display: none;
    }
  }
</style>
