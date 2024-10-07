import { create } from "zustand";

interface GameState {
  tiles: string[];
  revealedTiles: number[];
  matchedPairs: number[][];
  attempts: number;
  isGameOver: boolean;
  startTime: number | null;
  revealTile: (index: number) => void;
  resetGame: (shuffledTiles: string[]) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  tiles: [],
  revealedTiles: [],
  matchedPairs: [],
  attempts: 0,
  isGameOver: false,
  startTime: null,

  revealTile: (index: number) => {
    const { revealedTiles, matchedPairs, tiles, attempts } = get();

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
      set({ isGameOver: true });
    }
  },

  resetGame: (shuffledTiles: string[]) => {
    set({
      tiles: shuffledTiles,
      revealedTiles: [],
      matchedPairs: [],
      attempts: 0,
      isGameOver: false,
      startTime: Date.now(),
    });
  },
}));
