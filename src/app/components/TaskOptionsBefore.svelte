<script lang="ts">
  import { dispatcher, store } from "../logic/appLogic"
  import IconUp from "../icons/IconUp.svelte"
  import IconDown from "../icons/IconDown.svelte"

  export let index: number

  $: isFirst = index === 0
  $: isLast = index === $store.tasks.length - 1

  const onMoveUpClicked = () => dispatcher.moveTaskUpRequested(index)
  const onMoveDownClicked = () => dispatcher.moveTaskDownRequested(index)
</script>

<div class="task-options options-before">
  <div class="option" id="option-move-up" class:visually-hidden={isFirst} on:click={onMoveUpClicked}>
    <IconUp />
  </div>
  <div class="option" id="option-move-down" class:visually-hidden={isLast} on:click={onMoveDownClicked}>
    <IconDown />
  </div>
</div>

<style>
  .task-options {
    display: flex;
    gap: 10px;
  }

  .option {
    width: var(--unit);
    display: flex;
    justify-content: center;
    align-self: stretch;

    opacity: 0.05;
    transition: all 0.05s;
  }

  .option:hover {
    opacity: 1;
  }

  .visually-hidden {
    opacity: 0 !important;
  }
</style>
