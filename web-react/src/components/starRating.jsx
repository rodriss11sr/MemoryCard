import { useState } from 'react';

const StarRating = ({ nota, size = "1rem", editable = false, onRatingChange }) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  const stars = [];
  
  // Si es editable y no hay nota, mostrar estrellas vacías
  if (!editable && (nota === undefined || nota === null)) return null;

  const displayRating = editable ? (hoveredRating || nota || 0) : nota;

  for (let i = 1; i <= 5; i++) {
    const isActive = i <= displayRating; 

    stars.push(
      <span 
        key={i} 
        onClick={() => editable && onRatingChange && onRatingChange(i)}
        onMouseEnter={() => editable && setHoveredRating(i)}
        onMouseLeave={() => editable && setHoveredRating(0)}
        style={{
          justifyContent: "center", 
          color: isActive ? "#fbbf24" : "#4b5563", 
          fontSize: size,
          marginRight: "2px",
          display: "inline-block",
          transition: "color 0.2s",
          cursor: editable ? "pointer" : "default",
        }}
      >
        ★
      </span>
    );
  }
  
  return <div style={{ lineHeight: 1 }}>{stars}</div>;
};

export default StarRating;