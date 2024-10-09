import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import './GameHistory.scss';

import { loadGameHistory } from '@/utils/localStorage';

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
            <div className="header">
                <Link to="/" className="back-button">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </Link>
                <h2>Game History</h2>
            </div>

            {history.length === 0 ? (
                <p>No game history available yet.</p>
            ) : (
                <ul>
                    {history.map((game, index) => (
                        <li key={index} className="game-history-item">
                            <p><b>Date: </b>{new Date(game.date).toLocaleString()}</p>
                            <p><b>Attempts:</b> {game.attempts}</p>
                            <p><b>Duration:</b> {formatDuration(game.duration)}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default GameHistory;
