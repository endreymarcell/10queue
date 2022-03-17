<script lang="ts">
  import { store, dispatcher } from "../logic/appLogic"
</script>

<button on:click={() => dispatcher.addTask()}>Add task</button>
<ol>
  {#each $store.tasks as task}
    <li>{task}</li>
  {/each}
</ol>
