<script lang="ts">
  let count = 0

  function onClick() {
    count++
  }
</script>

<button on:click={onClick}>Click me!</button>
<main>The button has been clicked {count} times.</main>
