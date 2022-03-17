<script lang="ts">
  import { dispatcher, store } from "../logic/appLogic"
  import { focusOnMount, setInputValueOnMount, onTextInputFinish, onTextInputCancel } from "../actions"

  export let index: number

  $: task = $store.tasks[index]
  $: isFocused = $store.focusedTaskIndex === index
  $: isFirst = index === 0
  $: isLast = index === $store.tasks.length - 1
  $: isEditing = $store.editingTaskAtIndex === index

  function onClick() {
    dispatcher.focusTaskRequested(index)
  }

  function onEditTaskClicked() {
    dispatcher.editTaskClicked(index)
  }

  function onInputFinish(newValue: string) {
    dispatcher.taskTitleChanged(index, newValue)
    dispatcher.editingTaskFinished()
  }

  function onInputCancel() {
    dispatcher.editingTaskFinished()
  }

  function onMoveUpClicked() {
    dispatcher.moveTaskUpRequested(index)
  }

  function onMoveDownClicked() {
    dispatcher.moveTaskDownRequested(index)
  }

  function onDeleteClicked() {
    dispatcher.deleteTaskClicked(index)
  }
</script>

<div>
  {#if isEditing}
    <input
      type="text"
      use:focusOnMount
      use:setInputValueOnMount={task}
      use:onTextInputFinish={onInputFinish}
      use:onTextInputCancel={onInputCancel}
    />
  {:else}
    <div class="task-row" class:focused={isFocused}>
      <div class="task-options options-before">
        <div class="option-move-up" class:disabled={isFirst} on:click={onMoveUpClicked}>(up)</div>
        <div class="option-move-down" class:disabled={isLast} on:click={onMoveDownClicked}>(down)</div>
      </div>
      <div class="task-body" on:click={onClick}>
        <div class="task-index">{index + 1}.</div>
        <div class="task-title">{task}</div>
      </div>
      <div class="task-options options-after">
        {#if isFirst}
          <div class="option-finish">(finish)</div>
        {/if}
        <div class="option-edit" on:click={onEditTaskClicked}>(edit)</div>
        <div class="option-delete" on:click={onDeleteClicked}>(delete)</div>
      </div>
    </div>
  {/if}
</div>

<style>
  .task-row {
    display: flex;
  }

  .focused {
    font-weight: bold;
  }

  .task-body {
    display: flex;
  }

  .task-options {
    display: flex;
  }

  .disabled {
    opacity: 0.4;
  }
</style>
