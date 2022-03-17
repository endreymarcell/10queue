<script lang="ts">
  import TaskRow from "../../components/TaskRow.svelte"
  import { store } from "../../logic/appLogic"
  import { shortcutMap } from "./queueHelpers"
  import { keyboardShortcuts } from "../../../app/actions"

  $: isEditing = $store.editingTaskAtIndex !== null
</script>

<main use:keyboardShortcuts={{ shortcuts: shortcutMap, getEnabledStatus: () => !isEditing }}>
  {#each $store.tasks as _, index}
    <TaskRow {index} />
  {/each}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
  }
</style>
