import Board from './components/Board/Board';
import './App.scss'
import './styles/global.scss'

const App: React.FC = () => {


  return (
    <div className="app">
      <h1>Memory Card Matching Game</h1>
      <Board />
    </div>
  );
};

export default App;
