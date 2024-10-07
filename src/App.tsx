import Board from './components/Board';
import Statistics from './components/Statistics';

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>Memory Card Matching Game</h1>
      <Statistics />
      <Board />
    </div>
  );
};

export default App;
