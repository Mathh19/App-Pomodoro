import React, { useCallback, useState } from 'react';
import { SettingsTimer } from './settings-timer-pomodoro';
import { ToggleSwitch } from './toggleSwitch-button';

export function Modal(): JSX.Element {
  const [btnClose, setBtnClose] = useState(false);
  const [themeDark, setThemeDark] = useState(false);

  const closeModal = useCallback(() => {
    const config = document.body.querySelector('.config-settings');
    config?.classList.toggle('onSettings');
  }, [btnClose, setBtnClose]);

  const configureThemeDark = useCallback(() => {
    const pomodoroDiv = document.body.querySelector('.pomodoro');
    if (themeDark) {
      pomodoroDiv?.classList.add('dark');
    } else {
      pomodoroDiv?.classList.toggle('dark');
    }
  }, [themeDark, setThemeDark]);

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
          pomodoroTime={25}
          shortsRestTime={5}
          longRestTime={15}
          cycles={4}
        ></SettingsTimer>
        <div className="config-modal">
          <ToggleSwitch
            className="switch"
            onClick={() => configureThemeDark()}
          ></ToggleSwitch>
        </div>
        <div className="btn-box">
          <button>Save</button>
        </div>
      </form>
    </div>
  );
}
