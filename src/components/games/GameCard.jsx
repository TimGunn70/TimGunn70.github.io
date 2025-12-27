import { useNavigate } from 'react-router-dom';

function GameCard({ title, description, path, difficulty, algorithm, status, image }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (status === "Play Now") {
      navigate(path);
    }
  };

  const getDifficultyColor = (diff) => {
    switch(diff) {
      case "Easy": return "#4ade80"; // green
      case "Medium": return "#fbbf24"; // yellow
      case "Hard": return "#f87171"; // red
      default: return "#ffffff";
    }
  };

  return (
    <div className="Game-Card">
      <div className="game-card-content">
        {image && (
          <div className="game-image">
            <img src={image} alt={title} />
          </div>
        )}
        <div className="game-info">
          <h3>{title}</h3>
          
          <div className="game-badges">
            <span className="badge algorithm-badge">{algorithm}</span>
            <span 
              className="badge difficulty-badge" 
              style={{ backgroundColor: getDifficultyColor(difficulty) }}
            >
              {difficulty}
            </span>
            <span className={`badge status-badge ${status === "Play Now" ? 'ready' : 'coming-soon'}`}>
              {status}
            </span>
          </div>
          
          <p>{description}</p>
          
          <button 
            className={`play-button ${status === "Play Now" ? 'ready' : 'disabled'}`}
            onClick={handleClick}
            disabled={status !== "Play Now"}
          >
            {status === "Play Now" ? "Play Now →" : "Coming Soon"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameCard;