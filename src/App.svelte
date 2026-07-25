<script lang="ts">
  import { onMount } from "svelte";
  import type { BillSession, Payer } from "./bill.types";
  import { fetchBillSession, fetchPayers } from "./utils";
  import JoinPage from "./lib/JoinPage.svelte";
  import BillPreviewPage from "./lib/BillPreviewPage.svelte";
  import ClaimItemsPage from "./lib/ClaimItemsPage.svelte";
  import Logo from "./lib/Logo.svelte";

  let billSession: BillSession | undefined = $state();
  let payers: Payer[] = $state([]);
  let selectedPayerIds: string[] = $state([]);
  let hasSelectedPayers: boolean = $derived(selectedPayerIds.length > 0);

  onMount(async () => {
    const bs = await fetchBillSession();
    if (!bs) return;
    billSession = bs;
    payers = await fetchPayers(billSession.id);

    const selectedPayerIdsCsv = localStorage.getItem("selected_payer_ids");
    const selectedPayerIdsList = selectedPayerIdsCsv?.split(",");

    if (!selectedPayerIdsList) return;

    for (const id of selectedPayerIdsList) {
      const sid = id.trim();
      if (payers.filter((payer) => payer.id === sid).length === 0) {
        console.log("Could not find payer id in list of payers", sid);
        continue;
      }
      selectedPayerIds.push(sid);
    }

    console.log(selectedPayerIds);
  });

  const submitSelectedPayers = (selectedPayerIdsArray: string[]) => {
    const selectedPayerIdsCsv = selectedPayerIdsArray.join(",");
    localStorage.setItem("selected_payer_ids", selectedPayerIdsCsv);
    selectedPayerIds = selectedPayerIdsArray;
  };
</script>

{#if !billSession}
  <div class="join">
    <Logo />
    <JoinPage />
  </div>
{/if}

{#if billSession && !hasSelectedPayers}
  <div class="bill-preview">
    <Logo />
    <BillPreviewPage
      {billSession}
      {payers}
      onSubmitSelectedPayers={submitSelectedPayers}
    />
  </div>
{/if}

{#if billSession && hasSelectedPayers}
  <div class="claim-items">
    <Logo />
    <ClaimItemsPage
      payers={payers.filter((payer) => selectedPayerIds.includes(payer.id))}
    />
  </div>
{/if}

<style>
  div {
    display: flex;
    box-sizing: border-box;
    height: 100dvh;
    flex-direction: column;
  }

  .join {
    background-color: var(--bg-pastel-red);
  }

  .bill-preview {
    background-color: var(--bg-pastel-blue);
  }

  .claim-items {
    background-color: var(--bg-pastel-red);
  }
</style>
