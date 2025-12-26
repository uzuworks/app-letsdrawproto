import { Canvas, IText, PencilBrush } from 'fabric';

let currentStamp =  '';
let canvas: Canvas;

export const initDraw = (el: HTMLCanvasElement|null) => {
  if (!el) return;

  canvas = new Canvas(el, {
    isDrawingMode: true,
    backgroundColor: 'snow',
    selection: false,
    defaultCursor: 'none',
    freeDrawingCursor: 'none',
    moveCursor: 'none',
  });
  canvas.freeDrawingBrush = new PencilBrush(canvas);

  canvas.on('path:created', (e) => {
    canvas.getObjects()[canvas.getObjects().length - 1].selectable = false;
  });

  resetCanvas();
  setStickStamp();
}

export const switchDrawMode = (isDrawing: boolean) => {
  if (!canvas) return;
  canvas.isDrawingMode = isDrawing;

  const cursorElement = document.querySelector('#cursor');
  if(!cursorElement) return;

  if(isDrawing){
    cursorElement.classList.remove('--stamp-mode');
    cursorElement.classList.add('--pen-mode');
  }else{
    cursorElement.classList.remove('--pen-mode');
    cursorElement.classList.add('--stamp-mode');
  }

}

export const getStrokeCount = (): number => {
  return canvas ? canvas.getObjects().length : 0;
}
export const undoLastPath = () => {
  if (!canvas) return;

  const objects = canvas.getObjects();
  if (objects.length === 0) return;

  const lastObject = objects[objects.length - 1];
  canvas.remove(lastObject);
}

export const resetCanvas = () => {
  if (!canvas) return;

  canvas.clear();
  canvas.backgroundColor = 'snow';
}

export const setPenConfig = (size: number, color: string) => {
  if (!canvas || !canvas.freeDrawingBrush) return;
  canvas.freeDrawingBrush.width = size;
  canvas.freeDrawingBrush.color = color;
}

export const getCanvasDataURL = (): string | null => {
  if (!canvas) return null;
  return canvas.toDataURL({
    multiplier: 2,
    format: 'png',
    quality: 1.0,
  });
}

export const setCurrentStamp = (stamp: string) => {
  currentStamp = stamp;
}

const setStickStamp = () => {
  let activeStamp: IText | null = null;

  canvas.on('mouse:down', (opt) => {
    if (!currentStamp || canvas.isDrawingMode) return;

    activeStamp = new IText(currentStamp, {
      left: opt.scenePoint!.x,
      top: opt.scenePoint!.y,
      fontSize: 40,
      selectable: true,
      evented: false,
    });

    canvas.add(activeStamp);
  });

  canvas.on('mouse:move', (opt) => {
    if (!activeStamp) return;

    const dx = opt.scenePoint.x - activeStamp.left!;
    const dy = opt.scenePoint.y - activeStamp.top!;
    const theta = Math.atan2(dy, dx);
    const distance = Math.sqrt(dx * dx + dy * dy);

    activeStamp.set({
      angle: theta * (180 / Math.PI) + 90,
      scaleX: distance * 3 / 100 + 1,
      scaleY: distance * 3 / 100 + 1,
    });
    canvas.requestRenderAll();
  });

  canvas.on('mouse:up', (opt) => {
    if (!activeStamp) return;

    activeStamp = null;

    const objects = canvas.getObjects();
    const lastObject = objects[objects.length - 1];
    lastObject.selectable = false;

    canvas.requestRenderAll();
  });



}
