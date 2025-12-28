import { useNavigate } from 'react-router-dom';

function GameCard({ title, description, path, difficulty, algorithm, status, image }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (status === "Play Now") {
      navigate(path);
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