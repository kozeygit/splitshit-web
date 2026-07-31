<script lang="ts">
    import type { Payer } from "$lib/types/bill.types";
    import PayerCard from "$lib/components/PayerCard.svelte";
    let { payers }: { payers: Payer[] } = $props();

    const doThis = () => {
        localStorage.removeItem("selected_payer_ids");
        navigation.reload();
    };
</script>

<section id="center" class="surface-card">
    {#each payers as payer, index}
        <PayerCard {index} id={payer.id} name={payer.name} />
    {/each}
    <button onclick={doThis}>GO BACK</button>
</section>
