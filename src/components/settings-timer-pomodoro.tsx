import React from 'react';
import { PropsTimesPomodoro } from '../interfaces/props-times-pomodoro';
import { minutesToSeconds } from '../utils/minutes-to-seconds';

export function SettingsTimer(props: PropsTimesPomodoro): JSX.Element {
  const pomodoroTime = minutesToSeconds(props.pomodoroTime);
  const shortRestTime = minutesToSeconds(props.shortsRestTime);
  const longRestTime = minutesToSeconds(props.longRestTime);
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
            <label>Descanso:</label>
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
            <label>Descanso longo:</label>
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
            <label>Ciclos:</label>
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
