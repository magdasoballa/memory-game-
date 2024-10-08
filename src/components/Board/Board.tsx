import Tile from '../Tile/Tile';
import { useGameStore } from '../../store/useGameStore';
import './Board.scss';
import { shuffleArray } from '../../utils/shuffle';
import img1 from '../../assets/images/img1.jpeg';
import img2 from '../../assets/images/img2.jpeg';
import img3 from '../../assets/images/img3.jpeg';
import img4 from '../../assets/images/img4.jpeg';
import img5 from '../../assets/images/img5.jpeg';
import img6 from '../../assets/images/img6.jpeg';
import img7 from '../../assets/images/img7.jpeg';
import img8 from '../../assets/images/img8.jpeg';
import GameSummary from '../GameSummary/GameSummary';
import GameHistory from '../GameHistory/GameHistory';
import { useEffect } from 'react';

const predefinedTiles = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
];

const Board: React.FC = () => {
    const { tiles, revealedTiles, matchedPairs, resetGame, revealTile, isGameOver, startGame } = useGameStore();

    const handleStartGame = () => {
        const tilesForGame = shuffleArray([...predefinedTiles, ...predefinedTiles]);
        resetGame(tilesForGame);
        startGame();
    };
    console.log(tiles)
    return (
        <>
            <button onClick={handleStartGame}>Start Game</button>

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
            <GameHistory />
        </>
    );
};

export default Board;