import { useState } from 'react';

const FullStar = ({ size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 9 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block' }}
  >
    <path
      d="M6.0293 2.6084L9 3.24707L6.97461 5.49707L7.28125 8.5L4.5 7.2832L1.71875 8.5L2.02539 5.49707L0 3.24707L2.9707 2.6084L4.5 0L6.0293 2.6084Z"
      fill="#DFB300"
    />
  </svg>
);

const EmptyStar = ({ size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 9 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block' }}
  >
    <path
      d="M6.0293 2.6084L9 3.24707L6.97461 5.49707L7.28125 8.5L4.5 7.2832L1.71875 8.5L2.02539 5.49707L0 3.24707L2.9707 2.6084L4.5 0L6.0293 2.6084Z"
      fill="#626262"
    />
  </svg>
);

const HalfStar = ({ size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 9 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block' }}
  >
    <path
      d="M4.49999 0L6.02963 2.60796L9 3.24671L6.97499 5.49727L7.28115 8.5L4.49999 7.28296L1.71884 8.5L2.02499 5.49727L-5.52833e-06 3.24671L2.97036 2.60796L4.49999 0Z"
      fill="#626262"
    />
    <path
      d="M1.71885 8.5L4.5 7.28296V0L2.97037 2.60796L0 3.24671L2.025 5.49727L1.71885 8.5Z"
      fill="#DFB300"
    />
  </svg>
);
/* ------------------------------------------------ */

const StarRating = ({ nota, size = '1rem', editable = false, onRatingChange }) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  // Si es editable y no hay nota, devolvemos estructura vacía
  if (!editable && (nota === undefined || nota === null)) return null;

  const displayRating = editable ? (hoveredRating || nota || 0) : nota;
  const stars = [];

  const getIcon = (index) => {
    if (displayRating >= index) return <FullStar size={size} />;
    if (displayRating >= index - 0.5) return <HalfStar size={size} />;
    return <EmptyStar size={size} />;
  };

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        onClick={() => editable && onRatingChange && onRatingChange(i)}
        onMouseEnter={() => editable && setHoveredRating(i)}
        onMouseLeave={() => editable && setHoveredRating(0)}
        style={{
          justifyContent: 'center',
          marginRight: '2px',
          display: 'inline-block',
          transition: 'color 0.2s',
          cursor: editable ? 'pointer' : 'default',
        }}
      >
        {getIcon(i)}
      </span>
    );
  }

  return <div style={{ lineHeight: 1 }}>{stars}</div>;
};

export default StarRating;