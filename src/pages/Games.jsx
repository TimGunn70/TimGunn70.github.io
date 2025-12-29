import GameCard from '../components/games/GameCard';

function Games() {
  const gamesData = [
    {
      id: 1,
      title: "Tic-Tac-Toe",
      description: "An interactive Tic-Tac-Toe environment featuring a Q-learning agent trained through 100,000+ self-play games, using temporal-difference learning and ε-greedy exploration to learn optimal state-action policies.",
      path: "/games/tictactoe",
      algorithm: "Trained with Q-Learning",
      status: "Play Now",
      image: "/Tic-Tac-Toe-Game.png"
    },
  ];

  return (
    <div className="tab-panel active games-page">
      <div className="games-intro">
        <h2>Play Against RL Agents</h2>
        <p>
          Test your skills against AI agents trained using various reinforcement learning algorithms. 
          Each agent learned to play through thousands of games, developing strategies and tactics 
          without human intervention.
        </p>
      </div>
      <div className="Games-List">
        {gamesData.map(game => (
          <GameCard 
            key={game.id}
            title={game.title}
            description={game.description}
            path={game.path}
            algorithm={game.algorithm}
            status={game.status}
            image={game.image}
          />
        ))}
      </div>
    </div>
  );
}

export default Games;