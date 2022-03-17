<script lang="ts">
  import TaskRow from "../components/TaskRow.svelte"
  import { dispatcher, store } from "../logic/appLogic"

  function queueShortcuts(_: HTMLElement) {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "j") {
        dispatcher.moveFocusDownRequested()
      } else if (event.key === "k") {
        dispatcher.moveFocusUpRequested()
      } else if (event.key === "d") {
        dispatcher.deleteFocusedTaskRequested()
      } else if (event.key === "e") {
        dispatcher.editFocusedTaskRequested()
      } else if (event.key === "J") {
        dispatcher.moveFocusedTaskDownRequested()
      } else if (event.key === "K") {
        dispatcher.moveFocusedTaskUpRequested()
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
