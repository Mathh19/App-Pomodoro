import React, { useEffect, useState, useCallback } from 'react';
import { useInterval } from '../hooks/use-interval';
import { PropsTimesPomodoro } from '../interfaces/props-times-pomodoro';
import { secondsToTime } from '../utils/seconds-to-time';
import { Button } from './button';
import { Timer } from './timer';
import { ToggleSwitch } from './toggleSwitch-button';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellStart = require('../sounds/bell-start.mp3');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellFinish = require('../sounds/bell-finish.mp3');

const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellFinish);

export function PomodoroTimer(props: PropsTimesPomodoro): JSX.Element {
  const [mainTime, setMainTime] = useState(props.pomodoroTime);
  const [timeCouting, setTimeCounting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  const [clickedButton, setClickedButton] = useState(false);
  const [cyclesQtdManager, setCyclesQtdManager] = useState(
    new Array(props.cycles - 1).fill(true),
  );
  const [completedCycles, setCompletedCycles] = useState(0);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);
  const [themeDark, setThemeDark] = useState(false);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
      if (working) setFullWorkingTime(fullWorkingTime + 1);
    },
    timeCouting ? 1000 : null,
  );

  const configureWork = useCallback(() => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMainTime(props.pomodoroTime);
    audioStartWorking.play();
  }, [
    setTimeCounting,
    setWorking,
    setResting,
    setMainTime,
    props.pomodoroTime,
  ]);

  const configureRest = useCallback(
    (long: boolean) => {
      setTimeCounting(true);
      setWorking(false);
      setResting(true);

      if (long) {
        setMainTime(props.longRestTime);
      } else {
        setMainTime(props.shortsRestTime);
      }

      audioStopWorking.play();
    },
    [
      setTimeCounting,
      setWorking,
      setResting,
      setMainTime,
      props.longRestTime,
      props.shortsRestTime,
    ],
  );

  const displayMainTime = useCallback(() => {
    let verifyDisplay = false;
    if (working) {
      verifyDisplay = window.confirm(
        'O pomodoro está em execução, deseja mesmo mudar a exibição do pomodoro ? (Isso não irá resetar o tempo de horas trabalhadas)',
      );
      if (verifyDisplay === true) {
        setClickedButton(true);
        setTimeCounting(false);
        clickedButton;
        setMainTime(props.pomodoroTime);
      }
    } else {
      setMainTime(props.pomodoroTime);
    }
  }, [working, setClickedButton, setMainTime]);

  const displayBreakTime = useCallback(() => {
    let verifyDisplay = false;
    if (working) {
      verifyDisplay = window.confirm(
        'O pomodoro está em execução, deseja mesmo mudar a exibição do pomodoro ? (Isso não irá resetar o tempo de horas trabalhadas)',
      );
      if (verifyDisplay === true) {
        setClickedButton(true);
        setTimeCounting(false);
        clickedButton;
        setMainTime(props.shortsRestTime);
      }
    } else {
      setMainTime(props.shortsRestTime);
    }
  }, [working, setClickedButton, setMainTime]);

  const displayLongBreak = useCallback(() => {
    let verifyDisplay = false;
    if (working) {
      verifyDisplay = window.confirm(
        'O pomodoro está em execução, deseja mesmo mudar a exibição do pomodoro ? (Isso não irá resetar o tempo de horas trabalhadas)',
      );
      if (verifyDisplay === true) {
        setClickedButton(true);
        setTimeCounting(false);
        clickedButton;
        setMainTime(props.longRestTime);
      }
    } else {
      setMainTime(props.longRestTime);
    }
  }, [working, setClickedButton, setMainTime]);

  const configureThemeDark = useCallback(() => {
    const pomodoroDiv = document.body.querySelector('.pomodoro');
    if (themeDark) {
      pomodoroDiv?.classList.add('dark');
    } else {
      pomodoroDiv?.classList.toggle('dark');
    }
  }, [themeDark, setThemeDark]);

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');

    if (mainTime > 0) return;

    if (working && cyclesQtdManager.length > 0) {
      configureRest(false);
      cyclesQtdManager.pop();
    } else if (working && cyclesQtdManager.length <= 0) {
      configureRest(true);
      setCyclesQtdManager(new Array(props.cycles - 1).fill(true));
      setCompletedCycles(completedCycles + 1);
    }

    if (working) setNumberOfPomodoros(numberOfPomodoros + 1);
    if (resting) configureWork();
  }, [
    working,
    resting,
    mainTime,
    cyclesQtdManager,
    numberOfPomodoros,
    completedCycles,
    themeDark,
    configureRest,
    setCyclesQtdManager,
    configureWork,
    props.cycles,
  ]);

  return (
    <div className="pomodoro">
      <div className="configurations">
        <ToggleSwitch
          className="switch"
          onClick={() => configureThemeDark()}
        ></ToggleSwitch>
        <Button text="Settings" className="btn-setting"></Button>
      </div>
      <h2>Você está: {working ? 'Trabalhando' : 'Descansando'}</h2>
      <div className="bar-times">
        <div>
          <Button
            text="Pomodoro"
            onClick={() => displayMainTime()}
            className="btn-default"
          ></Button>
        </div>
        <div>
          <Button
            text="Time rest"
            onClick={() => displayBreakTime()}
            className="btn-default"
          ></Button>
        </div>
        <div>
          <Button
            text="Time long rest"
            onClick={() => displayLongBreak()}
            className="btn-default"
          ></Button>
        </div>
      </div>
      <Timer mainTime={mainTime} />
      <div className="controls">
        <Button
          text="Work"
          onClick={() => configureWork()}
          className="btn-default"
        ></Button>
        <Button
          text="Rest"
          onClick={() => configureRest(false)}
          className="btn-default"
        ></Button>
        <Button
          className={
            !working && !resting ? 'hidden btn-default' : ' btn-default'
          }
          text={timeCouting ? 'Pause' : 'Play'}
          onClick={() => setTimeCounting(!timeCouting)}
        ></Button>
      </div>

      <div className="details">
        <p>Ciclos concluídos: {completedCycles}</p>
        <p>Horas trabalhadas: {secondsToTime(fullWorkingTime)}</p>
        <p>Pomodoros concluídos: {numberOfPomodoros}</p>
      </div>
    </div>
  );
}
