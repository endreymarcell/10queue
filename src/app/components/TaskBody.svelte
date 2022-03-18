<script lang="ts">
  import { dispatcher, store } from "../logic/appLogic"
  import { focusOnMount, setInputValueOnMount, onTextInputFinish, onTextInputCancel } from "../actions"

  export let index: number

  $: task = $store.tasks[index]
  $: isFocused = $store.focusedTaskIndex === index
  $: isEditing = $store.editingTaskAtIndex === index

  const onClick = () => dispatcher.focusTaskRequested(index)
  const onInputFinish = (newValue: string) => dispatcher.editingTaskCompleted(newValue)
  const onInputCancel = () => dispatcher.editingTaskCompleted()
</script>

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

<style>
  .task-body {
    display: flex;
  }

  input {
    border: 0;
    outline: none;
    padding: 0;
    background-color: transparent;
    font-size: 1rem;
    width: 100%;
  }
</style>
