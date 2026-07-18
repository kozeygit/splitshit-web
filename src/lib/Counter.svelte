<script lang="ts">
  let { index, increment, max }: {index: number, increment: () => void, max: number } = $props()
</script>

<button type="button" class="counter" onclick={increment}>
  Item {index+1} / {max}
</button>
