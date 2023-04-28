import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

import { formatDate } from '@/utils/formatDate';

interface CircularBarProps {
  onTimerEnd: () => void;
  shouldShowTimer?: boolean;
}

export type CircularBarHandle = {
  // eslint-disable-next-line no-unused-vars
  start: (totalMiliSeconds: number) => void;
};

/**
 * Circular progress bar, it is used to decrease its perimeter based on an initial time.
 *
 **/
export const CircularProgressBar = forwardRef<CircularBarHandle, CircularBarProps>(
  function TimerBar({ onTimerEnd, shouldShowTimer }: CircularBarProps, ref) {
    const [widthPercentage, setWidthPercentage] = useState(100);
    const [formattedTimeLeft, setFormattedTimeLeft] = useState('');
    const intervalRef = useRef<NodeJS.Timeout>();
    const startTime = useRef(Date.now());
    const totalTimeMilliseconds = useRef(0);

    const tick = () => {
      const elapsedTime = Date.now() - startTime.current;
      const progressPercentage = (elapsedTime / totalTimeMilliseconds.current) * 100;
      const timeLeft = new Date(
        1000 * Math.max(Math.round((totalTimeMilliseconds.current - elapsedTime) / 1000), 0),
      );

      if (progressPercentage >= 100 && intervalRef.current) {
        clearInterval(intervalRef.current);
        setWidthPercentage(100);
        setFormattedTimeLeft(
          formatDate(
            new Date(1000 * Math.max(Math.round(totalTimeMilliseconds.current / 1000), 0)),
            'es',
            { minute: 'numeric', second: 'numeric' },
          ),
        );
        return totalTimeMilliseconds.current !== 0 && onTimerEnd();
      }
      setFormattedTimeLeft(formatDate(timeLeft, 'es', { minute: 'numeric', second: 'numeric' }));

      return setWidthPercentage(100 - progressPercentage);
    };

    const start = (totalMilliSeconds: number) => {
      if (intervalRef.current) clearInterval(intervalRef.current);

      setWidthPercentage(100);
      totalTimeMilliseconds.current = totalMilliSeconds;
      startTime.current = Date.now();
      intervalRef.current = setInterval(tick, 10);
    };

    useImperativeHandle(ref, () => ({ start }));

    useEffect(() => {
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }, []);

    return (
      <div className="flex flex-col items-center">
        <svg className="w-24 h-24" viewBox="0 0 24 24">
          <circle className="text-neutral-20" cx="12" cy="12" r="10" strokeWidth="4" fill="none" />
          <circle
            className="text-green stroke-current"
            cx="12"
            cy="12"
            r="10"
            strokeWidth="2"
            fill="none"
            strokeDasharray="62.8"
            strokeDashoffset={62.8 - (widthPercentage / 100) * 62.8}
            strokeLinecap="round"
            transform="rotate(-90 12 12)"
          />
        </svg>
        {shouldShowTimer && (
          <div className="mt-2 text-lg text-center text-neutral-45">
            <span className="font-bold">{formattedTimeLeft}</span>
          </div>
        )}
      </div>
    );
  },
);

CircularProgressBar.defaultProps = {
  shouldShowTimer: false,
};
