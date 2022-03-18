<script lang="ts">
  import TaskRow from "../../components/TaskRow.svelte"
  import { store } from "../../logic/appLogic"
  import { shortcutMap } from "./queueHelpers"
  import { keyboardShortcuts } from "../../../app/actions"
  import NewTaskRow from "../../components/NewTaskRow.svelte"

  $: isEditing = $store.editingTaskAtIndex !== null
</script>

<main use:keyboardShortcuts={{ shortcuts: shortcutMap, getEnabledStatus: () => !isEditing }}>
  {#each $store.tasks as _, index}
    <TaskRow {index} />
  {/each}
  {#if $store.tasks.length < 10}
    <NewTaskRow />
  {/if}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
  }
</style>
