import React, { useCallback, useEffect, useState } from 'react';
import { PropsTimesPomodoro } from '../interfaces/props-times-pomodoro';
import { SettingsTimer } from './settings-timer-pomodoro';
import { ToggleSwitch } from './toggleSwitch-button';

export function Modal(props: PropsTimesPomodoro): JSX.Element {
  const [btnClose, setBtnClose] = useState(false);
  const [theme, setTheme] = useState('light');

  const closeModal = useCallback(() => {
    const config = document.body.querySelector('.config-settings');
    config?.classList.toggle('onSettings');
  }, [btnClose, setBtnClose]);

  const configureTheme = useCallback(() => {
    if (theme === 'light') {
      window.localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      window.localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  }, [theme, setTheme]);

  useEffect(() => {
    const pomodoroDiv = document.body.querySelector('.pomodoro');
    const localTheme = window.localStorage.getItem('theme');
    localTheme && setTheme(localTheme);

    if (localTheme === 'dark') {
      // const valueInput = document.body.querySelector('.switch-input');
      pomodoroDiv?.classList.add('dark');
    } else {
      pomodoroDiv?.classList.toggle('dark');
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const iconClose = require('../imgs/icon-close.png');

  return (
    <div className="config-settings onSettings">
      <div className="area-button">
        <button className="btn-close" onClick={() => closeModal()}>
          <img src={iconClose} alt="" />
        </button>
      </div>
      <form className="form">
        <SettingsTimer
          pomodoroTime={props.pomodoroTime}
          shortsRestTime={props.shortsRestTime}
          longRestTime={props.longRestTime}
          cycles={props.cycles}
        ></SettingsTimer>
        <div className="config-modal">
          <ToggleSwitch
            className="switch"
            onClick={() => configureTheme()}
          ></ToggleSwitch>
        </div>
        <div className="btn-box">
          <button>Save</button>
        </div>
      </form>
    </div>
  );
}
