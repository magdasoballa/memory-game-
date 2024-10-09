import { useEffect, useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import './Statistics.scss'

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

    const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <div className="statistics">
            <p>Attempts: {attempts}</p>
            <p>Elapsed Time: {formatTime(elapsedTime)}</p>
        </div>
    );
};

export default Statistics;
