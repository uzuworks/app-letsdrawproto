<script lang="ts">
  import { onMount } from 'svelte';
  import Credits from './Credits.svelte';
  import Control from './Control.svelte';
  import Tools from './Tools.svelte';
  import { isFreeDrawMode } from './store';
  import { initDraw, setPenConfig } from './draw';
  
  let penSize = $state(2);
  let penColor = $state('black');
  let stampType = $state('🌲');

  let letsdraw = $state(false);
  let complete = $state(false);
  let completeHide = $state(false);
  let showCredits = $state(false);
  let canvasEl: HTMLCanvasElement|null = $state(null);
  let cursorEl: HTMLDivElement|null = $state(null);
  let creditsDialog: HTMLDialogElement|null = $state(null);

  onMount(async () => {
    initDraw(canvasEl);
    setPenConfig(penSize, penColor);

  });

  const pointerenterCanvas = (e: PointerEvent) => {
    cursorEl?.classList.remove('--hide');
  }
  const pointerleaveCanvas = (e: PointerEvent) => {
    cursorEl?.classList.add('--hide');
  }
  const pointerMoveCanvas = (e: PointerEvent) => {
    if(cursorEl){
      cursorEl.style.setProperty('--pen-color', penColor);
      const borderColor = penColor === 'black' ? 'snow' : '#333';
      cursorEl.style.setProperty('--border-color', borderColor);
      const adjestedPenSize = penColor === 'black' ? penSize + 4 : penSize + 2;
      const cursorSize = $isFreeDrawMode ? adjestedPenSize : cursorEl.getBoundingClientRect().width;
      cursorEl.style.setProperty('--pen-size', `${cursorSize}px`);
      cursorEl.style.left = `${e.offsetX - cursorSize / 2}px`;
      cursorEl.style.top = `${e.offsetY - cursorSize / 2}px`;
      cursorEl.textContent = stampType;
    }
  }


</script>

<main>
  <Control bind:letsdraw bind:complete bind:completeHide bind:creditsDialog bind:showCredits />
  <div class="bottom">
    <Tools bind:penSize bind:penColor  bind:stampType />
    <div class="paintbox backlight" onpointerenter={pointerenterCanvas} onpointerleave={pointerleaveCanvas} onpointermove={pointerMoveCanvas}>
      <canvas id="canvas" bind:this={canvasEl} width="640" height="640"></canvas>
      <div class="yomogi" class:--active={letsdraw} id="letsdraw">かいてみよう！</div>
      <div id="result" class:--active={complete} class:--hide={completeHide}>
        <img src="./assets/images/flower.svg" alt="flower">
      </div>
      <div id="reset"></div>
      <div id="cursor" class="--hide --pen-mode" bind:this={cursorEl}>あ</div>
    </div>
  </div>

  <Credits bind:creditsDialog bind:showCredits />
</main>

<style>
</style>
