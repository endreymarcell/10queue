<script lang="ts">
  import { store } from "../logic/appLogic"
  import TaskOptionsBefore from "./TaskOptionsBefore.svelte"
  import TaskBody from "./TaskBody.svelte"
  import TaskOptionsAfter from "./TaskOptionsAfter.svelte"

  export let index: number

  $: isFocused = $store.focusedTaskIndex === index
</script>

<div class="task-row" class:focused={isFocused}>
  <TaskOptionsBefore {index} />
  <TaskBody {index} />
  <TaskOptionsAfter {index} />
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

  .task-row.focused {
    background-color: gold;
  }
</style>
