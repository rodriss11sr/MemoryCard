import React from 'react';

const StarRating = ({ nota, size = "1rem" }) => {
  const stars = [];
  
  // Si no hay nota válida, no pintamos nada
  if (nota === undefined || nota === null) return null;

  for (let i = 1; i <= 5; i++) {
    const isActive = i <= nota; 

    stars.push(
      <span 
        key={i} 
        style={{ 
          color: isActive ? "#fbbf24" : "#4b5563", 
          fontSize: size,
          marginRight: "2px",
          display: "inline-block",
          transition: "color 0.2s" 
        }}
      >
        ★
      </span>
    );
  }
  
  return <div style={{ lineHeight: 1 }}>{stars}</div>;
};

export default StarRating;