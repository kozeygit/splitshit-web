<script lang="ts">
  import svelteLogo from "./assets/svelte.svg";
  import viteLogo from "./assets/vite.svg";
  import heroImg from "./assets/hero.png";
  import Counter from "./lib/Counter.svelte";
  import { supabase } from "./supabaseClient";
  import { onMount } from "svelte";
  import type { BillItem } from "./bill.types";

  let billItems: BillItem[] = $state([]);
  let index = $state(0);
  let item = $derived(billItems[index]);

  onMount(async () => {
    const { data, error, status } = await supabase
      .from("bill_sessions")
      .select()
      .single();

    if (error) throw error;
    if (status !== 200) return;
    if (!data || !data.items) return;

    billItems = data.items as BillItem[];
  });

  const increaseIndex = () => {
    index = (index + 1) % billItems.length;
  };
</script>

<section id="center">
  <div class="hero">
    <img src={heroImg} class="base" width="170" height="179" alt="" />
    <img src={svelteLogo} class="framework" alt="Svelte logo" />
    <img src={viteLogo} class="vite" alt="Vite logo" />
  </div>
  <div>
    <h1>Get started</h1>
    <p>Edit <code>src/App.svelte</code> and save to test <code>HMR</code></p>
  </div>
  <Counter increment={increaseIndex} {index} max={billItems.length} />
  {#if item}
    <p>{item.name} - £{item.unit_price / 100} (x{item.quantity})</p>
  {/if}
</section>
