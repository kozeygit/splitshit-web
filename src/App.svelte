<script lang="ts">
    import { onMount } from "svelte";
    import type { BillSession, Payer } from "$lib/types/bill.types";
    import { fetchBillSession, fetchPayers } from "./utils";
    import JoinPage from "$lib/pages/JoinPage.svelte";
    import BillPreviewPage from "$lib/pages/BillPreviewPage.svelte";
    import ClaimItemsPage from "$lib/pages/ClaimItemsPage.svelte";
    import Logo from "$lib/components/Logo.svelte";

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

<Logo />
<section id="center">
    {#if !billSession}
        <JoinPage />
    {/if}

    {#if billSession && !hasSelectedPayers}
        <BillPreviewPage
            {billSession}
            {payers}
            onSubmitSelectedPayers={submitSelectedPayers}
        />
    {/if}

    {#if billSession && hasSelectedPayers}
        <ClaimItemsPage
            payers={payers.filter((payer) =>
                selectedPayerIds.includes(payer.id),
            )}
        />
    {/if}
</section>
