import React, { useEffect } from 'react';
import { useInterval } from '../hooks/use-interval';
import { Button } from './button';
import { Timer } from './timer';

interface Props {
  pomodoroTime: number;
  shortsRestTime: number;
  longRestTime: number;
  cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = React.useState(props.pomodoroTime);
  const [timeCouting, setTimeCounting] = React.useState(false);
  const [working, setWorking] = React.useState(false);

  useEffect(() => {
    if (working) document.body.classList.add('working');
  }, [working]);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
    },
    timeCouting ? 1000 : null,
  );

  const configureWork = () => {
    setTimeCounting(true);
    setWorking(true);
  };

  return (
    <div className="pomodoro">
      <h2>You are: working</h2>
      <Timer mainTime={mainTime} />
      <div className="controls">
        <Button text="Work" onClick={() => configureWork()}></Button>
        <Button text="Test" onClick={() => console.log(1)}></Button>
        <Button
          text={timeCouting ? 'Pause' : 'Play'}
          onClick={() => setTimeCounting(!timeCouting)}
        ></Button>
      </div>

      <div className="details">
        <p>Testando: Lorem ipsum dolor sit.</p>
        <p>Testando: Lorem ipsum dolor sit.</p>
        <p>Testando: Lorem ipsum dolor sit.</p>
      </div>
    </div>
  );
}
