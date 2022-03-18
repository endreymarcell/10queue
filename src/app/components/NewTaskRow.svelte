<script>
  import { dispatcher } from "../logic/appLogic"

  import GenericTaskRow from "./GenericTaskRow.svelte"

  const onClick = () => dispatcher.addTaskAtEndRequested()
</script>

<GenericTaskRow {onClick}>
  <div id="create-new-task">+</div>
</GenericTaskRow>

<style>
  #create-new-task {
    margin-left: 60px;
  }
</style>
