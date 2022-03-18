<script lang="ts">
  export let isFocused = false
  export let onClick = () => {}
</script>

<div class="task-row" class:focused={isFocused} on:click={onClick}>
  <slot />
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

  .task-row:hover {
    background-color: #eee;
  }

  .task-row.focused {
    background-color: gold;
  }
</style>
