import { useGameStore } from "../../store/useGameStore";

const GameSummary: React.FC = () => {
    const { attempts, isGameOver, startTime, revealedTiles, matchedPairs, tiles } = useGameStore();

    if (!isGameOver) {
        return null;
    }

    const endTime = Date.now();
    const gameDuration = startTime ? Math.floor((endTime - startTime) / 1000) : 0;
    console.log(revealedTiles.length)
    return (
        <div className="game-summary">
            <h2>Game Summary</h2>
            <p>Attempts: {attempts}</p>
            <p>Duration: {gameDuration} seconds</p>
        </div>
    );
};

export default GameSummary;
