<script lang="ts">
    import Plus from "~icons/ph/plus-bold";
    import Trash from "~icons/ph/trash-bold";
    import PayerIcon from "./PayerIcon.svelte";

    let {
        id,
        name,
        selected = false,
        onToggle,
        index,
    }: {
        id: string;
        name: string;
        selected?: boolean;
        onToggle?: (id: string) => void;
        index: number;
    } = $props();

    const handleToggle = () => {
        if (onToggle) {
            onToggle(id);
        }
    };
</script>

<button type="button" class="payerCard touchable" class:selected onclick={handleToggle}>
  <PayerIcon name={name} selected={selected} {index} />
  <span class="payerName">{name}</span>
    <div class="toggleIcon">
        {#if selected}
            <Trash color={"red"} scale=2 />
        {:else}
            <Plus />
        {/if}
    </div>
</button>

<style>
    .payerCard {
        font-family: var(--sans);
        font-weight: bold;
        background: var(--surface-white);
        border: none;
        border-bottom: 1px solid var(--border-light);
        align-items: center;
        font-size: 14px;
        display: flex;
        padding-block: 10px;
        gap: 8px;
        position: relative;
        overflow: hidden;

    }
    .payerName {
        text-align: left;
        flex: 1;
    }
    .toggleIcon {
        display: grid;
        place-items: center;
        padding-inline: 10px;

    }
</style>
