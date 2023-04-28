import React from 'react';
import { Button } from '@/atoms/Button';
import { AvailableStates } from '@/store';

interface Pros {
  currentState: AvailableStates;
  isTimerRun: boolean;
  setState: (state: AvailableStates) => void;
}

/**
 * Navigation component used to select or move between timers.
 *
 **/
export const SelectorBar = ({ isTimerRun, currentState, setState }: Pros) => {
  const CustomButton = ({ state }: { state: AvailableStates }) => {
    const dict = {
      pomodoro: 'Pomodoro',
      shortPause: 'Pausa corta',
      longPause: 'Pausa larga',
    };
    return (
      <Button
        active={currentState === state}
        disabled={isTimerRun}
        onClick={() => !isTimerRun && setState(state)}
      >
        {dict[state]}
      </Button>
    );
  };

  return (
    <div className="space-x-5 bg-primary-90 px-3 py-2 border rounded-lg">
      <CustomButton state="pomodoro" />
      <CustomButton state="shortPause" />
      <CustomButton state="longPause" />
    </div>
  );
};
