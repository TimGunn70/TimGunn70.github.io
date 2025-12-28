import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TicTacToeBoard from '../../components/games/TicTacToeBoard';
import { loadAgent } from '../../utils/QLearningAgent';

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [stats, setStats] = useState({ wins: 0, losses: 0, draws: 0 });
  const [agent, setAgent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load Q-Learning agent on mount
  useEffect(() => {
    const initAgent = async () => {
      const loadedAgent = await loadAgent();
      if (loadedAgent) {
        setAgent(loadedAgent);
        setIsLoading(false);
      } else {
        console.error('Failed to load agent, using random AI');
        setIsLoading(false);
      }
    };
    initAgent();
  }, []);

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const isBoardFull = (squares) => {
    return squares.every(square => square !== null);
  };

  const makeAIMove = (currentBoard) => {
    // If agent is loaded, use Q-Learning
    if (agent) {
    const move = agent.getMove(currentBoard);
    return move;
    }

    console.warn('Agent not loaded! Using random fallback');
    
    // Fallback: random move if agent not loaded
    const availableMoves = currentBoard
      .map((val, idx) => val === null ? idx : null)
      .filter(val => val !== null);
    
    if (availableMoves.length > 0) {
      const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
      return randomMove;
    }
    return null;
  };

  const handleCellClick = (index) => {
    if (gameOver || board[index] || !isPlayerTurn) return;

    // Player move
    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);

    const playerWin = checkWinner(newBoard);
    if (playerWin) {
      setWinner('X');
      setGameOver(true);
      setStats(prev => ({ ...prev, wins: prev.wins + 1 }));
      return;
    }

    if (isBoardFull(newBoard)) {
      setWinner('draw');
      setGameOver(true);
      setStats(prev => ({ ...prev, draws: prev.draws + 1 }));
      return;
    }

    setIsPlayerTurn(false);

    // AI move after short delay
    setTimeout(() => {
      const aiMove = makeAIMove(newBoard);
      if (aiMove !== null) {
        const aiBoard = [...newBoard];
        aiBoard[aiMove] = 'O';
        setBoard(aiBoard);

        const aiWin = checkWinner(aiBoard);
        if (aiWin) {
          setWinner('O');
          setGameOver(true);
          setStats(prev => ({ ...prev, losses: prev.losses + 1 }));
          return;
        }

        if (isBoardFull(aiBoard)) {
          setWinner('draw');
          setGameOver(true);
          setStats(prev => ({ ...prev, draws: prev.draws + 1 }));
          return;
        }

        setIsPlayerTurn(true);
      }
    }, 500);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setGameOver(false);
    setWinner(null);
  };

  const resetStats = () => {
    setStats({ wins: 0, losses: 0, draws: 0 });
  };

  return (
   <div className="tab-panel active">
      <div className="game-container">
        <Link to="/games" className="back-link">
          ← Back to Games
        </Link>

        <div className="game-header">
          <h1>Tic-Tac-Toe</h1>
          <p className="game-subtitle">
            {isLoading ? 'Loading AI Agent...' : 'Play against a Q-Learning Agent'}
          </p>
        </div>

        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading trained Q-Learning agent...</p>
          </div>
        ) : (
          <div className="game-content">
          <div className="game-board-container">
            <TicTacToeBoard 
              board={board}
              onCellClick={handleCellClick}
              gameOver={gameOver}
            />
            
            <div className="game-status">
              {gameOver ? (
                <div className="status-message">
                  {winner === 'X' && <span className="win-message">You Win!</span>}
                  {winner === 'O' && <span className="loss-message">AI Wins!</span>}
                  {winner === 'draw' && <span className="draw-message">Draw!</span>}
                </div>
              ) : (
                <div className="status-message">
                  {isPlayerTurn ? "Your turn (X)" : "AI is thinking..."}
                </div>
              )}
            </div>

            <button className="reset-button" onClick={resetGame}>
              New Game
            </button>
          </div>

          <div className="game-sidebar">
            <div className="stats-card">
              <h3>Statistics</h3>
              <div className="stat-row">
                <span className="stat-label">Wins:</span>
                <span className="stat-value win">{stats.wins}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Losses:</span>
                <span className="stat-value loss">{stats.losses}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Draws:</span>
                <span className="stat-value draw">{stats.draws}</span>
              </div>
              <button className="reset-stats-button" onClick={resetStats}>
                Reset Stats
              </button>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

export default TicTacToe;