import React from 'react';
import { PropsButton } from '../interfaces/props-button';

export function Button(props: PropsButton): JSX.Element {
  return (
    <button onClick={props.onClick} className={props.className}>
      {props.text}
    </button>
  );
}
