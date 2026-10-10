import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});

// Mock Canvas 2D Context for JSDOM
if (typeof HTMLCanvasElement !== 'undefined') {
  (HTMLCanvasElement.prototype as any).getContext = function () {
    return {
      clearRect: () => {},
      fillRect: () => {},
      drawImage: () => {},
      beginPath: () => {},
      moveTo: () => {},
      lineTo: () => {},
      closePath: () => {},
      stroke: () => {},
      fill: () => {},
      arc: () => {},
      ellipse: () => {},
      roundRect: () => {},
      rect: () => {},
      strokeRect: () => {},
      save: () => {},
      restore: () => {},
      translate: () => {},
      scale: () => {},
      rotate: () => {},
      measureText: (text: string) => ({ width: text.length * 8 }),
      fillText: () => {},
      strokeText: () => {},
      setLineDash: () => {},
    } as unknown as CanvasRenderingContext2D;
  };
}

