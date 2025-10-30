declare module 'canvas-confetti' {
  export interface Options {
    particleCount?: number;
    angle?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    drift?: number;
    ticks?: number;
    origin?: {
      x?: number;
      y?: number;
    };
    colors?: string[];
    shapes?: string[];
    scalar?: number;
    zIndex?: number;
  }

  export interface ConfettiFunction {
    (options?: Options): Promise<null> | null;
    reset: () => void;
  }

  const confetti: ConfettiFunction;
  export default confetti;
}

