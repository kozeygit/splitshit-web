<script lang="ts">
  import type { BillSession, Payer } from "../bill.types";
  import PayerCard from "./PayerCard.svelte";
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
  let subTotal: number = $derived(
    billSession.items.reduce(
      (acc, item) => item.unit_price * item.quantity + acc,
      0,
    ),
  );
  let servicePercent: number = $derived(
    (billSession.service_charge /
      (billSession.grand_total - billSession.service_charge)) *
      100,
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

<section id="center">
  <div class="surface-card bill">
    <h1 class="bill-title">{billSession.name}</h1>
    <div class="bill-info">
      <div class="info-row subtotal">
        <span class="text">Subtotal:</span>
        <div class="sep"></div>
        <span class="value">{(subTotal / 100).toFixed(2)}</span>
      </div>
      <div class="info-row service">
        <span class="text">Service Charge <i>({servicePercent}%)</i>: </span>
        <div class="sep"></div>
        <span class="value"
          >{(billSession.service_charge / 100).toFixed(2)}</span
        >
      </div>
      <div class="info-row total">
        <span class="text">Total:</span>
        <div class="sep"></div>
        <span class="value">{(billSession.grand_total / 100).toFixed(2)}</span>
      </div>
    </div>
  </div>

  <div class="payers">
  {#each payers as payer}
    <PayerCard
      id={payer.id}
      name={payer.name}
      selected={selectedPayerIds.has(payer.id)}
      onToggle={onTogglePayer}
    />
  {/each}
</div>

  <button class="btn btn-primary" onclick={submit}>Enter</button>
</section>

<style>
  .bill {
    display: flex;
    flex-direction: column;
    gap: 40px;
    justify-content: space-between;
  }
  .bill-title {
    font-weight: bolder;
  }
  .bill-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
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
  .payers {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
</style>
