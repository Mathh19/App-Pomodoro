import React from 'react';
import { PropsToggle } from '../interfaces/props-toggle';

export function ToggleSwitch(props: PropsToggle): JSX.Element {
  return (
    <div className="toggle-switch">
      <label className={props.className}>
        <input
          onClick={props.onClick}
          type="checkbox"
          className="switch-input"
          checked={props.checked}
        ></input>
        <span className="slider round"></span>
      </label>
    </div>
  );
}
