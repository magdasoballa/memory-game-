import Board from './components/Board/Board';
import './App.scss'
import './styles/global.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GameHistory from './components/GameHistory/GameHistory';

const App: React.FC = () => {


  return (
    <div className="app">
      <BrowserRouter>
        <h1>Memory Card Matching Game</h1>
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/history" element={<GameHistory />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
