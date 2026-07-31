<script lang="ts">
    let sessionToken: string = $state("");

    const join = () => {
        navigation.navigate(`/${sessionToken}`);
    };
</script>

<section id="center" class="surface-card">
    <h2>Session not found</h2>
    <input
        id="session_token_input"
        placeholder="enter session token"
        class="input-field session-token-input"
        type="text"
        bind:value={sessionToken}
    />
    <div></div>
</section>
<button class="btn btn-primary" onclick={join}>Join</button>

<style>
  h2 {
    text-align: center;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--text-muted);
  }
  .session-token-input {
    align-self: center;
  }
</style>
