export const playAudio = async (src: string) => {
  return new Promise<void>((resolve) => {
    const audio = new Audio(src);
    audio.onended = () => {
      resolve();
    };
    audio.play();
  });
}

export const playAnimation = async (el: HTMLElement, className: string) => {
  return new Promise<void>((resolve) => {
    const handleAnimationEnd = () => {
      el.classList.remove(className);
      el.removeEventListener('animationend', handleAnimationEnd);
      resolve();
    };
    el.addEventListener('animationend', handleAnimationEnd);
    el.classList.add(className);
  });
}

export const sleep = (ms: number) =>
  new Promise<void>((r) => setTimeout(r, ms));
