import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import './Board.scss';

import { useGameStore } from '@/store/useGameStore';
import { shuffleArray } from '@/utils/shuffle';
import { loadGameHistory } from '@/utils/localStorage';

import img1 from '@/assets/images/img1.jpeg';
import img2 from '@/assets/images/img2.jpeg';
import img3 from '@/assets/images/img3.jpeg';
import img4 from '@/assets/images/img4.jpeg';
import img5 from '@/assets/images/img5.jpeg';
import img6 from '@/assets/images/img6.jpeg';
import img7 from '@/assets/images/img7.jpeg';
import img8 from '@/assets/images/img8.jpeg';

import Tile from '../Tile/Tile';
import GameSummary from '../GameSummary/GameSummary';
import Statistics from '../Statistics/Statistics';

const tileSets = {
    easy: [img1, img2, img3, img4],
    medium: [img1, img2, img3, img4, img5, img6],
    hard: [img1, img2, img3, img4, img5, img6, img7, img8],
};

const Board: React.FC = () => {
    const { tiles, revealedTiles, matchedPairs, resetGame, revealTile, isGameOver, startGame, setDifficulty } = useGameStore();
    const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
    const [gameStarted, setGameStarted] = useState(false);
    const navigate = useNavigate();
    const gameHistory = loadGameHistory();

    useEffect(() => {
        resetGame([], 'easy');
        setGameStarted(false);
        setSelectedDifficulty('easy');
    }, [resetGame]);

    const handleDifficultyChange = (level: 'easy' | 'medium' | 'hard') => {
        if (tiles.length > 0 && !isGameOver) return;
        setSelectedDifficulty(level);
        setDifficulty(level);
    };

    const handleStartGame = () => {
        const tilesForGame = shuffleArray([...tileSets[selectedDifficulty], ...tileSets[selectedDifficulty]]);
        resetGame(tilesForGame, selectedDifficulty);
        startGame();
        setGameStarted(true);
    };

    const renderDifficultyButtons = () => {
        return Object.keys(tileSets).map(level => (
            <button
                key={level}
                onClick={() => handleDifficultyChange(level as 'easy' | 'medium' | 'hard')}
                className={`small ${selectedDifficulty === level ? 'selected' : ''}`}
                disabled={selectedDifficulty !== level && tiles.length > 0 && !isGameOver}
            >
                {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
        ));
    };

    return (
        <div className="board-container">
            {isGameOver && <Confetti />}
            <div className='button-container'>
                {renderDifficultyButtons()}
            </div>

            {tiles.length === 0 && (
                <button className='large' onClick={handleStartGame}>Start Game</button>
            )}

            {tiles.length > 0 && !isGameOver && (
                <button className='large' onClick={handleStartGame}>Reset Game</button>
            )}

            {isGameOver && (
                <button className='large' onClick={handleStartGame}>Start New Game</button>
            )}

            {gameStarted && !isGameOver && <Statistics />}

            <div className={`board ${isGameOver ? 'game-over' : ''}`}>
                {tiles.map((tile, index) => (
                    <Tile
                        key={index}
                        index={index}
                        image={tile}
                        isRevealed={revealedTiles.includes(index)}
                        isMatched={matchedPairs.some(pair => pair.includes(index))}
                        onClick={() => revealTile(index)}
                    />
                ))}
            </div>
            {isGameOver && <GameSummary />}
            {!!gameHistory.length && isGameOver && <button onClick={() => navigate('/history')}>Check Game History</button>}
        </div>
    );
};

export default Board;
