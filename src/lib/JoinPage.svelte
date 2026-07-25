<script lang="ts">
  let sessionToken: string = $state("");
</script>

<section id="center" class="surface-card">
  <label for="session_token_input"><h2>Bill Not Found</h2></label>
  <input id="session_token_input" placeholder="enter session token" class="input-field" type="text" bind:value={sessionToken}>
</section>
