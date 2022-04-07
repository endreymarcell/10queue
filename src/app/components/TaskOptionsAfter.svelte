<script lang="ts">
  import { dispatcher } from "../logic/appLogic"
  import IconComplete from "../icons/IconComplete.svelte"
  import IconEdit from "../icons/IconEdit.svelte"
  import IconDelete from "../icons/IconDelete.svelte"

  export let index: number

  $: isFirst = index === 0

  const onEditTaskClicked = () => dispatcher.editTaskClicked(index)
  const onCompleteClicked = () => dispatcher.completeRunningTaskRequested()
  const onDeleteClicked = () => dispatcher.deleteTaskClicked(index)
</script>

<div class="task-options options-after">
  <div class="option" id="option-complete" on:click={onCompleteClicked}>
    {#if isFirst}
      <IconComplete />
    {/if}
  </div>
  <div class="option" id="option-edit" on:click={onEditTaskClicked}>
    <IconEdit />
  </div>
  <div class="option" id="option-delete" on:click={onDeleteClicked}>
    <IconDelete />
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
</style>
