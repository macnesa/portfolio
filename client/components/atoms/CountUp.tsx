import React, { useEffect, useState, useRef } from 'react';

interface CountUpProps {
  value: number;       // target value (e.g. 3051)
  duration?: number;   // duration in ms (default: 3000ms)
}

const easeOutCubic = (t: number): number => {
  return 1 - Math.pow(1 - t, 3);
};

export const CountUp: React.FC<CountUpProps> = ({ value, duration = 3000 }) => {
  const [current, setCurrent] = useState(0);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    const step = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = timestamp - startTime.current;
      const rawRatio = Math.min(progress / duration, 1);
      const easedRatio = easeOutCubic(rawRatio);
      const displayValue = Math.floor(value * easedRatio);
      setCurrent(displayValue);

      if (progress < duration) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [value, duration]);

  return <span>{current.toLocaleString()}</span>;
};
