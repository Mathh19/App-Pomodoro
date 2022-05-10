import React from 'react';
import { PropsToggle } from '../interfaces/props-toggle';

export function ToggleSwitch(props: PropsToggle): JSX.Element {
  return (
    <label className={props.className}>
      <input
        onClick={props.onClick}
        type="checkbox"
        className="switch-input"
      ></input>
      <span className="slider round"></span>
    </label>
  );
}
