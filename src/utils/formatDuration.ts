export const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const formattedSecs = secs < 10 ? `0${secs}` : secs;
    return `${minutes}m ${formattedSecs}s`;
};