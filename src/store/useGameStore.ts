import { create } from "zustand";
import { saveGameHistory } from "../utils/localStorage";

interface GameState {
  tiles: string[];
  revealedTiles: number[];
  matchedPairs: number[][];
  attempts: number;
  isGameOver: boolean;
  startTime: number | null;
  timer: number;
  interval: NodeJS.Timeout | null;
  revealTile: (index: number) => void;
  resetGame: (shuffledTiles: string[]) => void;
  startGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => {
  return {
    tiles: [],
    revealedTiles: [],
    matchedPairs: [],
    attempts: 0,
    isGameOver: false,
    startTime: null,
    timer: 0,
    interval: null,

    revealTile: (index: number) => {
      const { revealedTiles, matchedPairs, tiles, attempts, isGameOver } =
        get();

      if (isGameOver) return;
      if (revealedTiles.length === 2) return;
      if (
        matchedPairs.some((pair) => pair.includes(index)) ||
        revealedTiles.includes(index)
      )
        return;

      const newRevealedTiles = [...revealedTiles, index];
      set({ revealedTiles: newRevealedTiles });

      if (newRevealedTiles.length === 2) {
        const [firstTile, secondTile] = newRevealedTiles;

        if (tiles[firstTile] === tiles[secondTile]) {
          set({
            matchedPairs: [...matchedPairs, [firstTile, secondTile]],
            revealedTiles: [],
            attempts: attempts + 1,
          });
        } else {
          setTimeout(() => {
            set({
              revealedTiles: [],
              attempts: attempts + 1,
            });
          }, 1000);
        }
      }

      const allTilesMatched = get().matchedPairs.length === tiles.length / 2;
      if (allTilesMatched) {
        const currentInterval = get().interval;
        if (currentInterval) clearInterval(currentInterval);
        const gameDuration = get().timer;
        const attempts = get().attempts;

        saveGameHistory(attempts, gameDuration);
        set({ isGameOver: true });
      }
    },

    resetGame: (shuffledTiles: string[]) => {
      const currentInterval = get().interval;
      if (currentInterval) clearInterval(currentInterval);

      set({
        tiles: shuffledTiles,
        revealedTiles: [],
        matchedPairs: [],
        attempts: 0,
        isGameOver: false,
        startTime: null,
        timer: 0,
        interval: null,
      });
    },

    startGame: () => {
      set({ startTime: Date.now(), timer: 0 });
      const intervalId = setInterval(() => {
        const currentTimer = get().timer;
        set({ timer: currentTimer + 1 });
      }, 1000);

      set({ interval: intervalId });
    },
  };
});
