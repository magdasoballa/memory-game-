export const saveGameHistory = (attempts: number, duration: number) => {
    const history = JSON.parse(localStorage.getItem('gameHistory') || '[]');
    history.push({ attempts, duration, date: new Date().toLocaleString() });
    localStorage.setItem('gameHistory', JSON.stringify(history));
  };
  
  export const getGameHistory = () => {
    return JSON.parse(localStorage.getItem('gameHistory') || '[]');
  };
  