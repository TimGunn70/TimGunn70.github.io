import { Stage, Layer, Line, Circle, Group, Rect } from 'react-konva';
import { useState, useEffect, useRef } from 'react';

function TicTacToeBoard({ board, onCellClick, gameOver }) {
  // const cellSize = 160;
  // const boardSize = cellSize * 3;
  const lineWidth = 4;
  const symbolStrokeWidth = 8;

  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  const baseSize = 480; // This is your cellSize (160) * 3
  const cellSize = 160;
  const boardSize = baseSize;

  // Automatically adjust the scale when the window resizes
  useEffect(() => {
    const checkSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        // Subtract padding if necessary (e.g., 20px for 10px padding on each side)
        const padding = 20; 
        const newScale = (width - padding) / baseSize;
        setScale(newScale > 1 ? 1 : newScale); // Don't scale up past 1:1
      }
    };

    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  const getCellPosition = (index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    return {
      x: col * cellSize,
      y: row * cellSize
    };
  };

  const drawX = (x, y) => {
    const padding = 20;
    const startX = x + padding;
    const startY = y + padding;
    const endX = x + cellSize - padding;
    const endY = y + cellSize - padding;

    return (
      <Group>
        <Line
          points={[startX, startY, endX, endY]}
          stroke="#00ccff"
          strokeWidth={symbolStrokeWidth}
          lineCap="round"
        />
        <Line
          points={[endX, startY, startX, endY]}
          stroke="#00ccff"
          strokeWidth={symbolStrokeWidth}
          lineCap="round"
        />
      </Group>
    );
  };

  const drawO = (x, y) => {
    const radius = cellSize / 2 - 25;
    const centerX = x + cellSize / 2;
    const centerY = y + cellSize / 2;

    return (
      <Circle
        x={centerX}
        y={centerY}
        radius={radius}
        stroke="#ff6b6b"
        strokeWidth={symbolStrokeWidth}
      />
    );
  };

  return (
    <div className="konva-container" ref={containerRef}>
      <div className="stage-wrapper">
      <Stage width={baseSize * scale} height={baseSize * scale} scaleX={scale} scaleY={scale}>
        <Layer>
          {/* Draw grid lines */}
          {/* Vertical lines */}
          <Line
            points={[cellSize, 0, cellSize, boardSize]}
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth={lineWidth}
          />
          <Line
            points={[cellSize * 2, 0, cellSize * 2, boardSize]}
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth={lineWidth}
          />
          {/* Horizontal lines */}
          <Line
            points={[0, cellSize, boardSize, cellSize]}
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth={lineWidth}
          />
          <Line
            points={[0, cellSize * 2, boardSize, cellSize * 2]}
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth={lineWidth}
          />

          {/* Draw clickable cells */}
          {board.map((cell, index) => {
            const { x, y } = getCellPosition(index);
            return (
              <Group key={index}>
                {/* Invisible clickable area */}
                <Rect
                  x={x}
                  y={y}
                  width={cellSize}
                  height={cellSize}
                  fill="transparent"
                  onClick={() => onCellClick(index)}
                  onTap={() => onCellClick(index)}
                  onMouseEnter={(e) => {
                    if (!cell && !gameOver) {
                      e.target.getStage().container().style.cursor = 'pointer';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.getStage().container().style.cursor = 'default';
                  }}
                />
                {/* Draw X or O */}
                {cell === 'X' && drawX(x, y)}
                {cell === 'O' && drawO(x, y)}
              </Group>
            );
          })}
        </Layer>
      </Stage>
      </div>
    </div>
  );
}

export default TicTacToeBoard;