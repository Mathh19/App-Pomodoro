import React from 'react';
import { PropsTimesPomodoro } from '../interfaces/props-times-pomodoro';

export function SettingsTimer(props: PropsTimesPomodoro): JSX.Element {
  const pomodoroTime = props.pomodoroTime;
  const shortsRestTime = props.shortsRestTime;
  const longRestTime = props.longRestTime;
  const cycles = props.cycles;

  return (
    <div className="config-settings">
      <form className="form">
        <div className="styles-box-inputs">
          <div>
            <label>Pomodoro:</label>
            <input
              type="number"
              min="0"
              max="1000"
              step="1"
              value={pomodoroTime}
            />
          </div>
          <div>
            <label>Time Rest:</label>
            <input
              type="number"
              min="0"
              max="1000"
              step="1"
              value={shortsRestTime}
            />
          </div>
          <div>
            <label>long Rest:</label>
            <input
              type="number"
              min="0"
              max="1000"
              step="1"
              value={longRestTime}
            />
          </div>
          <div>
            <label>Cycles:</label>
            <input type="number" min="0" max="1000" step="1" value={cycles} />
          </div>
        </div>
        <div className="btn-box">
          <button>Save</button>
        </div>
      </form>
    </div>
  );
}
