<script lang="ts">
  import { playAudio, playAnimation, sleep } from './util';
  import { getCanvasDataURL, getStrokeCount, resetCanvas } from './draw';
  import { selectThemes } from './theme';
  import confetti from "canvas-confetti";
  import { cdate } from 'cdate';

  let { letsdraw = $bindable(), complete = $bindable(), completeHide = $bindable(), creditsDialog = $bindable(), showCredits = $bindable() } = $props();
  
  let theme1 = $state('どこにいるかな？');
  let theme2 = $state('だれかな？');
  let theme3 = $state('どうしてるかな？');

  const conpleteThemes = async () => {
    complete = true;
    await playAudio('./assets/voice/complete.wav');

    confetti({
      particleCount: 150,
      spread: 150,
      scalar: 1,
      origin: { x: 0.5, y: 0.8 }
    });
    await playAudio('./assets/audio/Ooh.wav');

    const dataUrl = getCanvasDataURL();
    if(dataUrl){
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `image_${cdate().format('YYYYMMDD_HHmmss')}.png`;
      a.click();
    }
  }

  const resetDrawing = async () => {
    const strokes = getStrokeCount();
    if (strokes !== 0) {
      const result = await window.confirm('かきなおしますか？\nいまのえはなくなります。');
      if (!result) {
        return false;
      }
    }

    completeHide = true;
    await playAudio('./assets/voice/reset.wav');
    playAudio('./assets/audio/kirakira.wav');
    await playAnimation(document.querySelector('#reset')!, '--active');
    resetCanvas();
  }

  const genThemes = async () => {
    const strokes = getStrokeCount();
    if (strokes !== 0) {
      const result = await window.confirm('かきなおしますか？\nいまのえはなくなります。');
      if (!result) {
        return false;
      }
    }
    resetCanvas();

    completeHide = true;
    theme1 = '';
    theme2 = '';
    theme3 = '';

    const themes = selectThemes();

    playAudio('./assets/audio/pon.wav');
    theme1 = themes[0].text;
    await playAnimation(document.querySelector('.theme:nth-child(1)')!, '--active');
    await sleep(800);

    playAudio('./assets/audio/pon.wav');
    theme2 = themes[1].text;
    await playAnimation(document.querySelector('.theme:nth-child(2)')!, '--active');
    await sleep(800);

    playAudio('./assets/audio/pon.wav');
    theme3 = themes[2].text;
    await playAnimation(document.querySelector('.theme:nth-child(3)')!, '--active');
    await sleep(1200);

    letsdraw = true;
    await playAudio('./assets/voice/letsdraw.wav');

    setTimeout(() => {
      complete = false;
      completeHide = false;
      letsdraw = false;
    }, 500);
  }

</script>

<header class="header">
  <div class="buttons">
    <button class="yomogi backlight" onclick={genThemes}>つぎのおだい</button>
    <button class="yomogi backlight" onclick={resetDrawing}>かきなおし</button>
    <button class="yomogi backlight --done" onclick={conpleteThemes}>できあがり</button>
  </div>
  <div class="credits">
    <h1 class="yomogi">Let's Draw! proto</h1>
    <button class="yomogi" onclick={() => { creditsDialog?.showModal(); showCredits = true; }}>！</button>
  </div>
</header>
<div class="top">
  <div class="theme yomogi backlight"><span>{theme1}</span></div>
  <div class="theme yomogi backlight"><span>{theme2}</span></div>
  <div class="theme yomogi backlight"><span>{theme3}</span></div>
</div>
