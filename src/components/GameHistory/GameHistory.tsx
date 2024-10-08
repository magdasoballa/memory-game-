import { useEffect, useState } from 'react';
import { loadGameHistory } from '../../utils/localStorage';
import './GameHistory.scss';

const GameHistory: React.FC = () => {
    const [history, setHistory] = useState<{ attempts: number; duration: number; date: string }[]>([]);

    useEffect(() => {
        const gameHistory = loadGameHistory();
        setHistory(gameHistory);
    }, []);

    const formatDuration = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        const formattedSecs = secs < 10 ? `0${secs}` : secs;

        return `${minutes}m ${formattedSecs}s`;
    };

    return (
        <div className="game-history">
            <h2>Game History</h2>
            {history.length === 0 ? (
                <p>No game history available yet.</p>
            ) : (
                <ul>
                    {history.map((game, index) => (
                        <li key={index} className="game-history-item">
                            <p>Date: {new Date(game.date).toLocaleString()}</p>
                            <p>Attempts: {game.attempts}</p>
                            <p>Duration: {formatDuration(game.duration)}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default GameHistory;
