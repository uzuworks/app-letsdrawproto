<script lang="ts">
  export let creditsDialog: HTMLDialogElement|null = null;
  export let showCredits: boolean = false;

  const closeCredits = () => {
    showCredits = false;
  }
</script>

<dialog id="credit" bind:this={creditsDialog} onclick={closeCredits} oncancel={closeCredits}>
  <ul class="credit-list" class:--active={showCredits} ontransitionend={() => {if(!showCredits) { creditsDialog?.close(); }}}>
    <li>
      <div class="yomogi title">Audio(Voice)</div>
      <div class="yomogi content">VOICEVOX:春日部つむぎ</div>
    </li>
    <li>
      <div class="yomogi title">Audio(Sound Effects)</div>
      <div class="yomogi content">効果音ラボ（https://soundeffect-lab.info/）</div>
    </li>
    <li>
      <div class="yomogi title">Font</div>
      <div class="yomogi content">Yomogi（Google Fonts）</div>
    </li>
    <li>
      <div class="yomogi title">Inspired by</div>
      <div class="yomogi content">Kid Pix</div>
    </li>
    <li>
      <div class="yomogi title">Source</div>
      <div class="yomogi content">MIT License</div>
      <a class="yomogi content" href="https://github.com/uzuworks/app-letsdrawproto">https://github.com/uzuworks/app-letsdrawproto</a>
    </li>
  </ul>
</dialog>
