import React, { useEffect, useState, useCallback } from 'react';
import { useInterval } from '../hooks/use-interval';
import { secondsToTime } from '../utils/seconds-to-time';
import { Button } from './button';
import { Config } from './config-area';
import { Timer } from './timer';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellStart = require('../sounds/bell-start.mp3');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellFinish = require('../sounds/bell-finish.mp3');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const logoSettings = require('../imgs/logo-settings.png');

const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellFinish);

export function PomodoroTimer(): JSX.Element {
  const pomodoroTime = 1500;
  const shortsRestTime = 300;
  const longRestTime = 900;
  const cycles = 4;

  const [mainTime, setMainTime] = useState(pomodoroTime);
  const [timeCouting, setTimeCounting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  const [clickedButton, setClickedButton] = useState(false);
  const [cyclesQtdManager, setCyclesQtdManager] = useState(
    new Array(cycles - 1).fill(true),
  );
  const [completedCycles, setCompletedCycles] = useState(0);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);
  const [displaySettings, setDisplaySettings] = useState(false);

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
    setMainTime(pomodoroTime);
    audioStartWorking.play();
  }, [setTimeCounting, setWorking, setResting, setMainTime, pomodoroTime]);

  const configureRest = useCallback(
    (long: boolean) => {
      setTimeCounting(true);
      setWorking(false);
      setResting(true);

      if (long) {
        setMainTime(longRestTime);
      } else {
        setMainTime(shortsRestTime);
      }

      audioStopWorking.play();
    },
    [
      setTimeCounting,
      setWorking,
      setResting,
      setMainTime,
      longRestTime,
      shortsRestTime,
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
        setMainTime(pomodoroTime);
      }
    } else {
      setMainTime(pomodoroTime);
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
        setMainTime(shortsRestTime);
      }
    } else {
      setMainTime(shortsRestTime);
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
        setMainTime(longRestTime);
      }
    } else {
      setMainTime(longRestTime);
    }
  }, [working, setClickedButton, setMainTime]);

  const openSettings = useCallback(() => {
    const config = document.body.querySelector('.config-settings');
    if (displaySettings) {
      config?.classList.add('onSettings');
    } else {
      config?.classList.toggle('onSettings');
    }
  }, [displaySettings, setDisplaySettings]);

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');

    if (mainTime > 0) return;

    if (working && cyclesQtdManager.length > 0) {
      configureRest(false);
      cyclesQtdManager.pop();
    } else if (working && cyclesQtdManager.length <= 0) {
      configureRest(true);
      setCyclesQtdManager(new Array(cycles - 1).fill(true));
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
    configureRest,
    setCyclesQtdManager,
    configureWork,
    cycles,
  ]);

  return (
    <div className="pomodoro">
      <Config
        pomodoroTime={pomodoroTime}
        shortsRestTime={shortsRestTime}
        longRestTime={longRestTime}
        cycles={cycles}
      />
      <div className="configurations">
        <button className="btn-setting" onClick={() => openSettings()}>
          <img src={logoSettings} alt="" className="logoSettings" />
          Configuração
        </button>
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
            text="Descanso"
            onClick={() => displayBreakTime()}
            className="btn-default"
          ></Button>
        </div>
        <div>
          <Button
            text="Descanso longo"
            onClick={() => displayLongBreak()}
            className="btn-default"
          ></Button>
        </div>
      </div>
      <Timer mainTime={mainTime} />
      <div className="controls">
        <Button
          text="Começar"
          onClick={() => configureWork()}
          className="btn-default"
        ></Button>
        <Button
          text="Descanso"
          onClick={() => configureRest(false)}
          className="btn-default"
        ></Button>
        <Button
          className={
            !working && !resting ? 'hidden btn-default' : ' btn-default'
          }
          text={timeCouting ? 'Stop' : 'Play'}
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
