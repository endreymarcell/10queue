<script lang="ts">
  import TaskRow from "../components/TaskRow.svelte"
  import { dispatcher, store } from "../logic/appLogic"

  const shortcutMap = new Map(
    Object.entries({
      j: () => dispatcher.moveFocusDownRequested(),
      k: () => dispatcher.moveFocusUpRequested(),
      d: () => dispatcher.deleteFocusedTaskRequested(),
      e: () => dispatcher.editFocusedTaskRequested(),
      J: () => dispatcher.moveFocusedTaskDownRequested(),
      K: () => dispatcher.moveFocusedTaskUpRequested(),
      o: () => dispatcher.addTaskAfterFocusedRequested(),
      O: () => dispatcher.addTaskBeforeFocusedRequested(),
    })
  )

  function queueShortcuts(_: HTMLElement) {
    const onKeyDown = (event: KeyboardEvent) => {
      if ($store.editingTaskAtIndex !== null) {
        // do not handle key events while editing
        return
      }
      if (shortcutMap.has(event.key)) {
        event.preventDefault()
        shortcutMap.get(event.key)()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return {
      destroy: () => window.removeEventListener("keydown", onKeyDown),
    }
  }
</script>

<main use:queueShortcuts>
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
