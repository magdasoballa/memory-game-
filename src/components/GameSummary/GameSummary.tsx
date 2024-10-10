import { useGameStore } from "@/store/useGameStore";
import { formatDuration } from "@/utils/formatDuration";

const GameSummary: React.FC = () => {
    const { attempts, isGameOver, duration } = useGameStore();

    if (!isGameOver) {
        return null;
    }

    return (
        <div className="game-summary">
            <h2>Game Summary</h2>
            <p>Attempts: {attempts}</p>
            <p>Duration: {formatDuration(duration)}</p>
        </div>
    );
};

export default GameSummary;
