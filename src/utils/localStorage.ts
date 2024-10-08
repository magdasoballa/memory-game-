interface GameHistoryEntry {
  attempts: number;
  duration: number;
  date: string;
}

const STORAGE_KEY = "gameHistory";

export const saveGameHistory = (attempts: number, duration: number) => {
  const newEntry: GameHistoryEntry = {
    attempts,
    duration,
    date: new Date().toISOString(),
  };

  const existingHistory = loadGameHistory();
  existingHistory.push(newEntry);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(existingHistory));
};

export const loadGameHistory = (): GameHistoryEntry[] => {
  const history = localStorage.getItem(STORAGE_KEY);
  return history ? JSON.parse(history) : [];
};

export const clearGameHistory = () => {
  localStorage.removeItem(STORAGE_KEY);
};
