<script lang="ts">
  let {
    id,
    name,
    selected = false,
    onToggle,
  }: {
    id: string;
    name: string;
    selected?: boolean;
    onToggle?: (id: string) => void;
  } = $props();

  const handleToggle = () => {
    if (onToggle) {
      onToggle(id);
    }
  };
</script>

<button type="button" class="payerCardOuter" onclick={handleToggle}>
  <div class="surface-card-sm" class:selected>
    <div class="payerIcon">{name.slice(0, 2)}</div>
    <span>{name}</span>
  </div>
</button>

<style>
  .payerCardOuter {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0;
    border: none;
    background-color: transparent;
  }

  .selected {
    border: solid red 2px;
  }
  .payerIcon {
    border: var(--border-thin);
    border-radius: var(--radius-circle);
    aspect-ratio: 1/1;
    width: 20px;
    padding: 5px;
    font-family: var(--sans);
    place-items: center;
  }
</style>
