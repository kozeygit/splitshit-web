<script lang="ts">
    import Check from "~icons/ph/check-bold";

    let {
        name,
        selected = false,
        index,
    }: {
        name: string;
        selected?: boolean;
        index: number;
    } = $props();

    const colors = [
        "#FFC6FF",
        "#FAA0A0",
        "#FAC898",
        "#FDFFB6",
        "#C1E1C1",
        "#98F5E1",
        "#ADD8E6",
        "#A7C7E7",
        "#A0C4FF",
        "#BDB2FF",
    ];

    let iconColor = $derived(colors[index % colors.length]);
</script>

<div class="payerIcon" style="background-color: {iconColor};" class:selected>
    <span>{name.slice(0, 2)}</span>
    <div class="selectedIndicator" class:selected>
        <Check color={"white"} scale="2" />
    </div>
</div>

<style>
    .payerIcon {
        font-family: var(--sans);
        font-weight: bold;
        z-index: 10;
        text-transform: capitalize;
        font-size: 12px;
        border: var(--border-thin);
        border-radius: var(--radius-circle);
        aspect-ratio: 1/1;
        min-width: 20px;
        min-height: 20px;
        padding: 5px;
        display: grid;
        place-content: center;
        position: relative;
        overflow: hidden;

        .selectedIndicator {
            content: "";
            align-items: center;
            justify-content: center;
            display: none;
            position: absolute;
            inset: 0;
            background-color: rgba(0, 0, 0, 0.5);
        }

        .selected {
            display: flex;
        }
    }
</style>
