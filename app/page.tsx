'use client';
import { AvailableStates, useStore } from '@/store';
import { SelectorBar } from '@/molecules/SelectorBar';
import { Button } from '@/atoms/Button';
import { useRef, useState } from 'react';
import { ModalConfiguration } from '@/molecules/ModalConfiguration';
import { CircularProgressBar, CircularBarHandle } from '@/atoms/CircularProgressBar';
import { formatDate } from '@/utils/formatDate';

const Home = () => {
  const {
    currentState,
    pomodoroTimeMinutes,
    shortPauseTimeMinutes,
    longPauseTimeMinutes,
    setTimeToTimer,
    setState,
  } = useStore();
  const timerBarRef = useRef<CircularBarHandle>(null);
  const [isModalConfigurationOpen, setIsModalConfigurationOpen] = useState(false);
  const [isTimerRun, setIsTimerRun] = useState(false);

  const objectTimes: Record<string, number> = {
    pomodoro: pomodoroTimeMinutes * 60_000,
    shortPause: shortPauseTimeMinutes * 60_000,
    longPause: longPauseTimeMinutes * 60_000,
  };

  const stateMachine: Record<string, AvailableStates> = {
    pomodoro: 'shortPause',
    shortPause: 'longPause',
    longPause: 'pomodoro',
  };

  const onTimerEnd = () => {
    const audio = new Audio('/alarm.mp3');
    audio.play();
    setState(stateMachine[currentState]);

    setIsTimerRun(false);
  };

  const labelTimer = formatDate(
    new Date(1000 * Math.max(Math.round(objectTimes[currentState] / 1000), 0)),
    'es',
    { minute: 'numeric', second: 'numeric' },
  );

  const rebootTimer = () => {
    setIsTimerRun(false);
    timerBarRef.current?.start(0);
  };

  const handleButton = () => {
    if (isTimerRun) {
      setIsTimerRun(false);
      rebootTimer();
    } else {
      setIsTimerRun(true);
      timerBarRef.current?.start(objectTimes[currentState]);
    }
  };

  const handleNextStepButton = () => {
    rebootTimer();
    setState(stateMachine[currentState]);
  };

  return (
    <main className="flex flex-col items-center m-5 space-y-3">
      <ModalConfiguration
        isOpen={isModalConfigurationOpen}
        onClose={() => setIsModalConfigurationOpen(false)}
        currentValues={{
          pomodoro: pomodoroTimeMinutes,
          shortPause: shortPauseTimeMinutes,
          longPause: longPauseTimeMinutes,
        }}
        setValue={setTimeToTimer}
      />
      <div className="flex flex-col items-center space-y-3 my-40 p-8 border border-solid rounded-lg">
        <div className="flex flex-row bg-primary-90 border rounded-lg p-3 space-x-24">
          <div className="text-neutral-45 text-xl">NeuralClocks</div>
          <Button iconName="SettingIcon" onClick={() => setIsModalConfigurationOpen(true)}>
            Configuración
          </Button>
        </div>
        <SelectorBar currentState={currentState} setState={setState} isTimerRun={isTimerRun} />
        <div className="w-80">
          <CircularProgressBar
            shouldShowTimer={isTimerRun}
            onTimerEnd={onTimerEnd}
            ref={timerBarRef}
          />
          {!isTimerRun ? (
            <div className="mt-2 text-lg text-center text-neutral-45">
              <span className="font-bold">{labelTimer}</span>
            </div>
          ) : (
            false
          )}
        </div>
        <div className="flex flex-row bg-primary-90 border rounded-lg p-3 space-x-24 w-96 justify-between">
          <Button onClick={handleButton}>{isTimerRun ? 'Reiniciar' : 'Comenzar'}</Button>
          <Button iconName="NextStepIcon" onClick={handleNextStepButton}>
            Siguiente
          </Button>
        </div>
        <Button href={'https://blog.hubspot.es/sales/tecnica-pomodoro'}>Que es pomodoro</Button>
      </div>
    </main>
  );
};

export default Home;
