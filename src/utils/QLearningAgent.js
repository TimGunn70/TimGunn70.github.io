class QLearningAgent {
  constructor(qTable) {
    this.qTable = qTable;
  }

  /**
   * Convert board array to state key string
   * board: array of 9 elements (null, 'X', or 'O')
   * Returns: string like "X_O______" 
   */
  getStateKey(board) {
    return board.map(cell => {
      if (cell === 'X') return 'X';
      if (cell === 'O') return 'O';
      return '_';
    }).join('');
  }

  /**
   * Get available moves (indices where board[i] is null)
   */
  getAvailableActions(board) {
    return board
      .map((cell, idx) => cell === null ? idx : null)
      .filter(idx => idx !== null);
  }

  /**
   * Get the best action based on Q-values
   * Returns: index of best move (0-8)
   */
  getBestAction(board) {
    const stateKey = this.getStateKey(board);
    const available = this.getAvailableActions(board);

    if (available.length === 0) {
      return null;
    }

    // If state not in Q-table, return random move
    if (!this.qTable[stateKey]) {
      return available[Math.floor(Math.random() * available.length)];
    }

    // Get Q-values for available actions
    const qValues = available.map(action => ({
      action,
      qValue: this.qTable[stateKey][action] || 0
    }));

    // Find action with highest Q-value
    const bestMove = qValues.reduce((best, current) => 
      current.qValue > best.qValue ? current : best
    );

    return bestMove.action;
  }

  /**
   * Check if there's an immediate winning or blocking move
   */
  checkImmediateMove(board) {
    
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    // First, check if O can win
    for (let line of lines) {
      const [a, b, c] = line;
      const vals = [board[a], board[b], board[c]];
      const oCount = vals.filter(v => v === 'O').length;
      const nullCount = vals.filter(v => v === null).length;
      
      
      if (oCount === 2 && nullCount === 1) {
        // O can win!
        if (board[a] === null) return a;
        if (board[b] === null) return b;
        if (board[c] === null) return c;
      }
    }

    // Second, check if need to block X from winning
    for (let line of lines) {
      const [a, b, c] = line;
      const vals = [board[a], board[b], board[c]];
      const xCount = vals.filter(v => v === 'X').length;
      const nullCount = vals.filter(v => v === null).length;
      
      if (xCount === 2 && nullCount === 1) {
        // Must block X!
        if (board[a] === null) return a;
        if (board[b] === null) return b;
        if (board[c] === null) return c;
      }
    }

    return null; // No immediate threat
  }

  /**
   * Main method to get agent's move with threat detection
   */
  getMove(board) {
    // First check for immediate winning or blocking moves
    const immediateMove = this.checkImmediateMove(board);
    if (immediateMove !== null) {
      return immediateMove;
    }

    // Otherwise use Q-Learning
    return this.getBestAction(board);
  }
}

// Load Q-table and create agent
export async function loadAgent() {
  try {
    const response = await fetch('/q_table.json');
    const qTable = await response.json();
    return new QLearningAgent(qTable);
  } catch (error) {
    console.error('Error loading Q-table:', error);
    return null;
  }
}

export default QLearningAgent;