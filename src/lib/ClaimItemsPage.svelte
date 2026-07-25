<script lang="ts">
    import type { Payer } from "../bill.types";
    import PayerCard from "./PayerCard.svelte";
    let { payers }: {payers: Payer[]} = $props()

    const doThis = () => {
        localStorage.removeItem("selected_payer_ids")
        navigation.reload()
    }
</script>

<section id="center" class="surface-card">
  {#each payers as payer}
    <PayerCard
      id={payer.id}
      name={payer.name}
    />
  {/each}
  <button onclick={doThis}>GO BACK</button>
</section>
