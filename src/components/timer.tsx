import React from 'react';
import { PropsMainTimer } from '../interfaces/props-main-timer';
import { secondsToMinutes } from '../utils/seconds-to-minutes';

export function Timer(props: PropsMainTimer): JSX.Element {
  return <div className="timer">{secondsToMinutes(props.mainTime)}</div>;
}
