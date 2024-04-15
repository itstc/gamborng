import React, { useEffect, useRef, useState } from 'react';

const rolls = ['common', 'rare', 'uncommon', 'common', 'common', 'rare', 'gilded', 'jackpot'];

export function RollPanel({ onClose }) {
  const [rollIdx, setRollIdx] = useState(0);
  const timerRef = useRef(null);

  const rollDone = rollIdx === rolls.length - 1;

  useEffect(() => {
    clearTimeout(timerRef.current);
    if (rollIdx < rolls.length - 1) {
      timerRef.current = setTimeout(() => setRollIdx((prev) => prev + 1), 500);
    }
  }, [rollIdx]);

  return (
    <div className={`roll-panel ${rollDone && 'roll-done'}`} onClick={rollDone && onClose}>
      <h1 className={`roll-text ${rolls[rollIdx]}`}>{rolls[rollIdx]}</h1>
    </div>
  );
}
