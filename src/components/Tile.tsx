import './Tile.scss'

interface TileProps {
    image: string;
    index: number;
    isRevealed: boolean;
    isMatched: boolean;
    onClick: () => void;
}

const Tile: React.FC<TileProps> = ({ image, index, isRevealed, isMatched, onClick }) => {
    const tileClass = `tile ${isMatched ? 'matched' : ''}`;

    return (
        <div className={tileClass} onClick={onClick}>
            {isRevealed || isMatched ? (
                <img src={image} alt={`Tile ${index}`} />
            ) : (
                <div className="tile-placeholder">?</div>
            )}
        </div>
    );
};

export default Tile;
