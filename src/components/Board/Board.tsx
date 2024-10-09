import Tile from '../Tile/Tile';
import { useGameStore } from '../../store/useGameStore';
import './Board.scss';
import { shuffleArray } from '../../utils/shuffle';
import img1 from '@/assets/images/img1.jpeg';
import img2 from '@/assets/images/img2.jpeg';
import img3 from '@/assets/images/img3.jpeg';
import img4 from '@/assets/images/img4.jpeg';
import img5 from '@/assets/images/img5.jpeg';
import img6 from '@/assets/images/img6.jpeg';
import img7 from '@/assets/images/img7.jpeg';
import img8 from '@/assets/images/img8.jpeg';
import GameSummary from '../GameSummary/GameSummary';
import { useState } from 'react';
import Statistics from '../Statistics/Statistics';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { loadGameHistory } from '../../utils/localStorage';

const easyTiles = [img1, img2, img3, img4];
const mediumTiles = [img1, img2, img3, img4, img5, img6];
const hardTiles = [img1, img2, img3, img4, img5, img6, img7, img8];

const Board: React.FC = () => {
    const { tiles, revealedTiles, matchedPairs, resetGame, revealTile, isGameOver, startGame, setDifficulty } = useGameStore();
    const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
    const [gameStarted, setGameStarted] = useState(false);
    const navigate = useNavigate();
    const gameHistory = loadGameHistory();

    const handleDifficultyChange = (level: 'easy' | 'medium' | 'hard') => {
        if (tiles.length > 0 && !isGameOver) return;
        setSelectedDifficulty(level);
        setDifficulty(level);
    };

    const handleStartGame = () => {
        let tilesForGame: string[] = [];
        switch (selectedDifficulty) {
            case 'easy':
                tilesForGame = shuffleArray([...easyTiles, ...easyTiles]);
                break;
            case 'medium':
                tilesForGame = shuffleArray([...mediumTiles, ...mediumTiles]);
                break;
            case 'hard':
                tilesForGame = shuffleArray([...hardTiles, ...hardTiles]);
                break;
            default:
                tilesForGame = shuffleArray([...easyTiles, ...easyTiles]);
        }
        resetGame(tilesForGame, selectedDifficulty);
        startGame();
        setGameStarted(true);
    };

    const handleResetGame = () => {
        handleStartGame();
    };

    return (
        <>
            {isGameOver && <Confetti />}
            <div className='button-container'>
                <button
                    onClick={() => handleDifficultyChange('easy')}
                    className={`small ${selectedDifficulty === 'easy' ? 'selected' : ''}`}
                    disabled={selectedDifficulty !== 'easy' && tiles.length > 0 && !isGameOver}
                >
                    Easy
                </button>
                <button
                    onClick={() => handleDifficultyChange('medium')}
                    className={`small ${selectedDifficulty === 'medium' ? 'selected' : ''}`}
                    disabled={selectedDifficulty !== 'medium' && tiles.length > 0 && !isGameOver}
                >
                    Medium
                </button>
                <button
                    onClick={() => handleDifficultyChange('hard')}
                    className={`small ${selectedDifficulty === 'hard' ? 'selected' : ''}`}
                    disabled={selectedDifficulty !== 'hard' && tiles.length > 0 && !isGameOver}
                >
                    Hard
                </button>
            </div>

            {tiles.length === 0 && (
                <button className='large' onClick={handleStartGame}>Start Game</button>
            )}

            {tiles.length > 0 && !isGameOver && (
                <button className='large' onClick={handleResetGame}>Reset Game</button>
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
            {!!gameHistory.length && <button onClick={() => navigate('/history')}>Check Game History</button>}

        </>
    );
};

export default Board;
