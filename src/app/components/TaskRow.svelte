<script lang="ts">
  import { dispatcher, store } from "../logic/appLogic"
  import { focusOnMount, setInputValueOnMount, onTextInputFinish, onTextInputCancel } from "../actions"

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
      <div class="task-row-field" id="option-move-up" class:disabled={isFirst} on:click={onMoveUpClicked}>(U)</div>
      <div class="task-row-field" id="option-move-down" class:disabled={isLast} on:click={onMoveDownClicked}>(D)</div>
    </div>
    <div class="task-body" class:focused={isFocused} on:click={onClick}>
      <div class="task-index">{index + 1}.</div>
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
      <div class="task-row-field" id="option-finish">
        {#if isFirst}F{/if}
      </div>
      <div class="task-row-field" id="option-edit" on:click={onEditTaskClicked}>E</div>
      <div class="task-row-field" id="option-delete" on:click={onDeleteClicked}>D</div>
    </div>
  </div>
</div>

<style>
  * {
    --unit: 50px;
  }

  .task-row {
    width: 100%;
    height: 50px;
    display: grid;
    grid-template-columns: calc(var(--unit) * 2) auto calc(var(--unit) * 3);
    border-top: 1px solid black;
    align-items: center;
  }

  .task-row-field {
    width: var(--unit);
    display: flex;
    justify-content: center;
    align-self: stretch;
    cursor: pointer;
  }

  .task-body {
    display: flex;
  }

  .task-body.focused {
    font-weight: bold;
  }

  .task-options {
    display: flex;
  }
</style>
