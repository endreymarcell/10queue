<script lang="ts">
  import { dispatcher, store } from "../logic/appLogic"
  import { focusOnMount, setInputValueOnMount, onTextInputFinish, onTextInputCancel } from "../actions"
  import IconUp from "../icons/IconUp.svelte"
  import IconDown from "../icons/IconDown.svelte"
  import IconFinish from "../icons/IconFinish.svelte"
  import IconEdit from "../icons/IconEdit.svelte"
  import IconDelete from "../icons/IconDelete.svelte"

  export let index: number

  $: task = $store.tasks[index]
  $: isFocused = $store.focusedTaskIndex === index
  $: isFirst = index === 0
  $: isLast = index === $store.tasks.length - 1
  $: isEditing = $store.editingTaskAtIndex === index

  const onClick = () => dispatcher.focusTaskRequested(index)
  const onEditTaskClicked = () => dispatcher.editTaskClicked(index)
  const onInputFinish = (newValue: string) => {
    dispatcher.taskTitleChanged(index, newValue)
    dispatcher.editingTaskFinished()
  }
  const onInputCancel = () => dispatcher.editingTaskFinished()
  const onMoveUpClicked = () => dispatcher.moveTaskUpRequested(index)
  const onMoveDownClicked = () => dispatcher.moveTaskDownRequested(index)
  const onDeleteClicked = () => dispatcher.deleteTaskClicked(index)
</script>

<div>
  <div class="task-row" class:focused={isFocused}>
    <div class="task-options options-before">
      <div class="option" id="option-move-up" class:visually-hidden={isFirst} on:click={onMoveUpClicked}>
        <IconUp />
      </div>
      <div class="option" id="option-move-down" class:visually-hidden={isLast} on:click={onMoveDownClicked}>
        <IconDown />
      </div>
    </div>
    <div class="task-body" class:focused={isFocused} on:click={onClick}>
      <div class="task-index">{index + 1}.&nbsp;</div>
      {#if isEditing}
        <input
          type="text"
          use:focusOnMount
          use:setInputValueOnMount={task}
          use:onTextInputFinish={onInputFinish}
          use:onTextInputCancel={onInputCancel}
        />
      {:else}
        <div class="task-title">{task}</div>
      {/if}
    </div>
    <div class="task-options options-after">
      <div class="option" id="option-finish">
        {#if isFirst}
          <IconFinish />
        {/if}
      </div>
      <div class="option" id="option-edit" on:click={onEditTaskClicked}>
        <IconEdit />
      </div>
      <div class="option" id="option-delete" on:click={onDeleteClicked}>
        <IconDelete />
      </div>
    </div>
  </div>
</div>

<style>
  * {
    --unit: 20px;
  }

  .task-row {
    width: 100%;
    height: 50px;
    display: grid;
    grid-template-columns: calc(10px + var(--unit) * 2) auto calc(20px + var(--unit) * 3);
    border-top: 1px solid black;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    padding: 0 10px;

    transition: background-color 0.05s;
  }

  .task-row:hover .option {
    opacity: 1;
  }

  .task-row.focused {
    background-color: gold;
  }

  .task-row.focused .option {
    opacity: 1;
  }

  .task-body {
    display: flex;
  }

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
    transition: opacity 0.05s;
  }

  .option:hover {
    color: blue;
  }

  input {
    border: 0;
    outline: none;
    padding: 0;
    background-color: transparent;
    font-size: 1rem;
  }

  .visually-hidden {
    opacity: 0 !important;
  }
</style>
