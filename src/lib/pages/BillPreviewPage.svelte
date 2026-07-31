<script lang="ts">
    import type { BillSession, Payer } from "$lib/types/bill.types";
    import PayerCard from "$lib/components/PayerCard.svelte";
    import PayerIcon from "$lib/components/PayerIcon.svelte";
    let {
        billSession,
        payers,
        onSubmitSelectedPayers,
    }: {
        billSession: BillSession;
        payers: Payer[];
        onSubmitSelectedPayers: (selectedPayerIds: string[]) => void;
    } = $props();
    let selectedPayerIds: Set<string> = $state(new Set([]));
    let selectedPayers: Payer[] = $derived(
        payers.filter((payer) => selectedPayerIds.has(payer.id)),
    );

    let subTotal: number = $derived(
        billSession.items.reduce(
            (acc, item) => item.unit_price * item.quantity + acc,
            0,
        ),
    );
    let servicePercent: number = $derived(
        subTotal > 0 ? (billSession.service_charge / subTotal) * 100 : 0,
    );

    const onTogglePayer = (payerId: string) => {
        if (selectedPayerIds.has(payerId)) {
            selectedPayerIds.delete(payerId);
        } else {
            selectedPayerIds.add(payerId);
        }
        selectedPayerIds = new Set(selectedPayerIds);
        console.log(selectedPayerIds.has(payerId));
    };
    const submit = () => {
        const selectedPayerIdsArray = Array.from(selectedPayerIds);
        onSubmitSelectedPayers(selectedPayerIdsArray);
    };
</script>

<div class="surface-card bill">
    <h1 class="bill-title">{billSession.name}</h1>
    <div class="selectedPayers">
        {#each selectedPayers as payer}
            <button onclick={() => onTogglePayer(payer.id)}>
            <PayerIcon name={payer.name} index={payers.indexOf(payer)} />
            </button>
        {/each}
    </div>
    <div class="bill-info">
        <div class="info-row subtotal">
            <div class="text">Subtotal:</div>
            <div class="sep"></div>
            <div class="value">{(subTotal / 100).toFixed(2)}</div>
        </div>
        <div class="info-row service">
            <div class="text">Service Charge <i>({servicePercent}%)</i>:</div>
            <div class="sep"></div>
            <div class="value">
                {(billSession.service_charge / 100).toFixed(2)}
            </div>
        </div>
        <div class="info-row total">
            <div class="text">Total:</div>
            <div class="sep"></div>
            <div class="value">
                {(billSession.grand_total / 100).toFixed(2)}
            </div>
        </div>
    </div>

    <h3>Select Payers</h3>

    <div class="payers">
        {#each payers as payer, index}
            <PayerCard
                id={payer.id}
                name={payer.name}
                selected={selectedPayerIds.has(payer.id)}
                onToggle={onTogglePayer}
                {index}
            />
        {/each}
    </div>
</div>

<button
    class="btn btn-primary"
    onclick={submit}
    disabled={selectedPayerIds.size === 0}>Enter</button
>

<style>
    .bill {
        display: flex;
        flex-direction: column;
        gap: 20px;
        justify-content: space-between;
    }
    .bill-title {
        font-weight: bolder;
        margin: 0;
    }
    .bill-info {
        display: flex;
        flex-direction: column;
        gap: 2px;
        padding-inline: 5px;
    }
    .subtotal,
    .service {
        color: var(--text-muted);
        font-size: 14px;
    }

    .total {
        font-weight: bold;
        font-size: 16px;
    }
    .value::before {
        content: "£";
    }
    .sep {
        flex-grow: 1;
        border-bottom: dotted 1px var(--text-muted);
        translate: 0 0.3rem;
        margin-inline: 5px;
    }
    .info-row {
        display: flex;
        align-items: center;
    }
    h3 {
        border-bottom: 1px solid var(--text-muted);
        padding-bottom: 10px;
        margin-bottom: 0px;
    }
    .payers {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }
    .selectedPayers {
        min-height: 32px;
        padding-inline: 10px;
        gap: 5px;
        display: flex;

        button {
            background: none;
            border: none;
            padding: 0;

        }
    }
</style>
