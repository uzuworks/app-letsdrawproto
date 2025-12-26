<script lang="ts">
  import { isFreeDrawMode } from './store';
  import { setPenConfig, undoLastPath, switchDrawMode, setCurrentStamp } from './draw';
  import { playAudio, playAnimation } from './util';

  let { penSize = $bindable(), penColor = $bindable(), stampType = $bindable() } = $props();
  let ribbonEl: HTMLElement|null = $state(null);

  $effect(() => {
    setPenConfig(penSize, penColor);
  });
  $effect(() => {
    setCurrentStamp(stampType);
  }); 

  const enableStamps = () => {
    switchDrawMode(false);
    document.querySelector('.pen-box')?.classList.add('--hide');
    document.querySelector('.stamp-box')?.classList.remove('--hide');
    document.querySelector('.cat-stamp')?.classList.add('--hide');
    document.querySelector('.cat-pen')?.classList.remove('--hide');
    isFreeDrawMode.set(false);
  }
  const enablePens = () => {
    switchDrawMode(true);
    document.querySelector('.stamp-box')?.classList.add('--hide');
    document.querySelector('.pen-box')?.classList.remove('--hide');
    document.querySelector('.cat-pen')?.classList.add('--hide');
    document.querySelector('.cat-stamp')?.classList.remove('--hide');
    isFreeDrawMode.set(true);
  }

  let startx: number|null = null;
  const pointerDownRibbon = (e: PointerEvent) => {

    if(e.target && e.target !== ribbonEl || ribbonEl === null){
      return;
    }

    ribbonEl.setPointerCapture(e.pointerId);
    if(ribbonEl?.classList.contains('--active')){
      ribbonEl.classList.remove('--active');
      return;
    }

    e.stopPropagation();
    startx = e.clientX;
  }
  const pointerUpRibbon = (e: PointerEvent) => {
    e.stopPropagation();
    if(e.target && e.target !== ribbonEl || ribbonEl === null){
      return;
    }

    ribbonEl.releasePointerCapture(e.pointerId);
    if(ribbonEl.classList.contains('--active')){
      return;
    }

    ribbonEl.style.setProperty('--drag-x', '0px');
    startx = null;
    playAnimation(ribbonEl, '--wiggle');
  }
  const pointerMoveRibbon = (e: PointerEvent) => {
    e.stopPropagation();
    if (startx === null) return;
    if(e.target && e.target !== ribbonEl || ribbonEl === null){
      return;
    }

    if (e.clientX - startx < 38){
      ribbonEl.style.setProperty('--drag-x', `${e.clientX - startx}px`);
    }else{
      ribbonEl.style.setProperty('--drag-x', '0px');
      startx = null;
      ribbonEl.classList.add('--active');
    }

  }

  const undoLastStroke = async (e: Event) => {
    e.stopPropagation();
    await playAudio('./assets/voice/undo.wav');
    undoLastPath();
  }

</script>

<div id="toolbox">
  <div class="pen-box">
    <div class="draw-icons backlight">
      <input class="draw" type="radio" value={2} name="draw" bind:group={penSize} aria-label="thin" style="background-image: url(./assets/images/pen-thin.svg);">
      <input class="draw" type="radio" value={8} name="draw" bind:group={penSize} aria-label="medium" style="background-image: url(./assets/images/pen-medium.svg);">
      <input class="draw" type="radio" value={32} name="draw" bind:group={penSize} aria-label="bold" style="background-image: url(./assets/images/pen-bold.svg);">
      <input class="draw" type="radio" value={128} name="draw" bind:group={penSize} aria-label="heavy" style="background-image: url(./assets/images/pen-heavy.svg);">
    </div>
    <div class="color-icons backlight">
      <input class="color" type="radio" value="black" name="color" bind:group={penColor} aria-label="black" style="background-color: black;">
      <input class="color" type="radio" value="gray" name="color" bind:group={penColor} aria-label="gray" style="background-color: gray;">
      <input class="color" type="radio" value="snow" name="color" bind:group={penColor} aria-label="snow" style="background-color: snow;">

      <input class="color" type="radio" value="red" name="color" bind:group={penColor} aria-label="red" style="background-color: red;">
      <input class="color" type="radio" value="blue" name="color" bind:group={penColor} aria-label="blue" style="background-color: blue;">
      <input class="color" type="radio" value="green" name="color" bind:group={penColor} aria-label="green" style="background-color: green;">
      <input class="color" type="radio" value="pink" name="color" bind:group={penColor} aria-label="pink" style="background-color: pink;">
      <input class="color" type="radio" value="cyan" name="color" bind:group={penColor} aria-label="cyan" style="background-color: cyan;">
      <input class="color" type="radio" value="lime" name="color" bind:group={penColor} aria-label="lime" style="background-color: lime;">

      <input class="color" type="radio" value="orange" name="color" bind:group={penColor} aria-label="orange" style="background-color: orange;">
      <input class="color" type="radio" value="purple" name="color" bind:group={penColor} aria-label="purple" style="background-color: purple;">
      <input class="color" type="radio" value="sienna" name="color" bind:group={penColor} aria-label="sienna" style="background-color: sienna;">

      <input class="color" type="radio" value="khaki" name="color" bind:group={penColor} aria-label="khaki" style="background-color: khaki;">
      <input class="color" type="radio" value="orchid" name="color" bind:group={penColor} aria-label="orchid" style="background-color: orchid;">
      <input class="color" type="radio" value="tan" name="color" bind:group={penColor} aria-label="tan" style="background-color: tan;">
    </div>
  </div>
  <div class="stamp-box --hide">
    <div class="stamp-icons backlight">
      <label class="stamp"><input type="radio" value="🌲" name="stamp" bind:group={stampType} aria-label="evergreen tree"><span>🌲</span></label>
      <label class="stamp"><input type="radio" value="🌳" name="stamp" bind:group={stampType} aria-label="deciduous tree"><span>🌳</span></label>
      <label class="stamp"><input type="radio" value="🌴" name="stamp" bind:group={stampType} aria-label="palm tree"><span>🌴</span></label>
      <label class="stamp"><input type="radio" value="🍁" name="stamp" bind:group={stampType} aria-label="autumn leaf"><span>🍁</span></label>
      <label class="stamp"><input type="radio" value="🍀" name="stamp" bind:group={stampType} aria-label="clover leaf"><span>🍀</span></label>
      <label class="stamp"><input type="radio" value="🌿" name="stamp" bind:group={stampType} aria-label="green sprig"><span>🌿</span></label>
      <label class="stamp"><input type="radio" value="🌷" name="stamp" bind:group={stampType} aria-label="tulip"><span>🌷</span></label>
      <label class="stamp"><input type="radio" value="🌻" name="stamp" bind:group={stampType} aria-label="sunflower"><span>🌻</span></label>
      <label class="stamp"><input type="radio" value="🪻" name="stamp" bind:group={stampType} aria-label="flower sprig"><span>🪻</span></label>
      <label class="stamp"><input type="radio" value="🌸" name="stamp" bind:group={stampType} aria-label="cherry blossom"><span>🌸</span></label>
      <label class="stamp"><input type="radio" value="🏵️" name="stamp" bind:group={stampType} aria-label="rosette"><span>🏵️</span></label>
      <label class="stamp"><input type="radio" value="🌺" name="stamp" bind:group={stampType} aria-label="hibiscus"><span>🌺</span></label>
      <label class="stamp"><input type="radio" value="🔥" name="stamp" bind:group={stampType} aria-label="fire"><span>🔥</span></label>
      <label class="stamp"><input type="radio" value="💧" name="stamp" bind:group={stampType} aria-label="water drop"><span>💧</span></label>
      <label class="stamp"><input type="radio" value="❄️" name="stamp" bind:group={stampType} aria-label="snowflake"><span>❄️</span></label>
      <label class="stamp"><input type="radio" value="☁️" name="stamp" bind:group={stampType} aria-label="cloud"><span>☁️</span></label>
      <label class="stamp"><input type="radio" value="🌵" name="stamp" bind:group={stampType} aria-label="cactus"><span>🌵</span></label>
      <label class="stamp"><input type="radio" value="💮" name="stamp" bind:group={stampType} aria-label="decorative stamp"><span>💮</span></label>
      <label class="stamp"><input type="radio" value="✨" name="stamp" bind:group={stampType} aria-label="sparkles"><span>✨</span></label>
      <label class="stamp"><input type="radio" value="❤️" name="stamp" bind:group={stampType} aria-label="heart"><span>❤️</span></label>
      <label class="stamp"><input type="radio" value="⭐️" name="stamp" bind:group={stampType} aria-label="star"><span>⭐️</span></label>
      <label class="stamp"><input type="radio" value="💡" name="stamp" bind:group={stampType} aria-label="light bulb"><span>💡</span></label>
      <label class="stamp"><input type="radio" value="🌀" name="stamp" bind:group={stampType} aria-label="spiral"><span>🌀</span></label>
      <label class="stamp"><input type="radio" value="💢" name="stamp" bind:group={stampType} aria-label="anger mark"><span>💢</span></label>
    </div>
  </div>
    <div class="category-box">
      <button class="category cat-stamp backlight" onclick={enableStamps}><img src="./assets/images/stamp.svg" alt="stamp"></button>
      <button class="category cat-pen backlight --hide" onclick={enablePens}><img src="./assets/images/penstand.svg" alt="penstand"></button>
    </div>

  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div id="ribbon" class="backlight" bind:this={ribbonEl} onpointerdown={pointerDownRibbon} onpointerup={pointerUpRibbon} onpointermove={pointerMoveRibbon} role="button" tabindex="0">
    <button class="undo" onclick={undoLastStroke}><img src="./assets/images/undo.svg" alt="undo"></button>
  </div>
</div>
