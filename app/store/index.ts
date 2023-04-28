import { create } from 'zustand';

export type AvailableStates = 'pomodoro' | 'shortPause' | 'longPause';

export interface TimeToTimer {
  time: number;
  timerName: AvailableStates;
}

interface Store {
  pomodoroTimeMinutes: number;
  shortPauseTimeMinutes: number;
  longPauseTimeMinutes: number;
  currentState: 'pomodoro' | 'shortPause' | 'longPause';
  setTimeToTimer: (values: TimeToTimer) => void;
  setState: (newState: AvailableStates) => void;
}

export const useStore = create<Store>((set) => ({
  pomodoroTimeMinutes: 25,
  shortPauseTimeMinutes: 5,
  longPauseTimeMinutes: 15,
  currentState: 'pomodoro',
  setTimeToTimer: ({ time, timerName }: TimeToTimer) =>
    set(() => ({ [`${timerName}TimeMinutes`]: time })),
  setState: (newState: AvailableStates) =>
    set(() => ({
      currentState: newState,
    })),
}));
