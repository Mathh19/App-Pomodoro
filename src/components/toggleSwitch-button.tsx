import React from 'react';

interface Props {
  onClick?: () => void;
  className?: string;
}

export function ToggleSwitch(props: Props): JSX.Element {
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
