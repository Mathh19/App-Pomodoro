import React from 'react';
import { PropsTimesPomodoro } from '../interfaces/props-times-pomodoro';

export function SettingsTimer(props: PropsTimesPomodoro): JSX.Element {
  const pomodoroTime = props.pomodoroTime;
  const shortRestTime = props.shortsRestTime;
  const longRestTime = props.longRestTime;
  const cycles = props.cycles;

  return (
    <div>
      <div className="div-settings">
        <div className="styles-box-inputs">
          <div>
            <label>Pomodoro:</label>
            <input
              type="number"
              min="1"
              max="10000"
              step="1"
              defaultValue={pomodoroTime}
              className="valuePomodoroTime"
            />
          </div>
          <div>
            <label>Time Rest:</label>
            <input
              type="number"
              min="1"
              max="10000"
              step="1"
              defaultValue={shortRestTime}
              className="valueShortTime"
            />
          </div>
          <div>
            <label>long Rest:</label>
            <input
              type="number"
              min="1"
              max="10000"
              step="1"
              defaultValue={longRestTime}
              className="valueLongTime"
            />
          </div>
          <div>
            <label>Cycles:</label>
            <input
              type="number"
              min="1"
              max="10000"
              step="1"
              defaultValue={cycles}
              className="cycles"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
