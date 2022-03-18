<script lang="ts">
  import { store } from "../logic/appLogic"
  import TaskOptionsBefore from "./TaskOptionsBefore.svelte"
  import TaskBody from "./TaskBody.svelte"
  import TaskOptionsAfter from "./TaskOptionsAfter.svelte"
  import GenericTaskRow from "./GenericTaskRow.svelte"

  export let index: number

  $: isFocused = $store.focusedTaskIndex === index
</script>

<GenericTaskRow {isFocused}>
  <TaskOptionsBefore {index} />
  <TaskBody {index} />
  <TaskOptionsAfter {index} />
</GenericTaskRow>
