import { useEffect, useState } from 'react';
import { useGameStore } from '../store/useGameStore';

const Statistics: React.FC = () => {
    const { attempts, startTime, isGameOver } = useGameStore();
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;

        if (startTime && !isGameOver) {
            timer = setInterval(() => {
                setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
            }, 1000);
        }

        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [startTime, isGameOver]);

    return (
        <div className="statistics">
            <p>Attempts: {attempts}</p>
            <p>Elapsed Time: {elapsedTime} seconds</p>
        </div>
    );
};

export default Statistics;
