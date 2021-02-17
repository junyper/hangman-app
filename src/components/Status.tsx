import React from 'react';
import classNames from 'classnames';
import { MAX_INCORRECT } from '../constants';
import './Status.css';

interface StatusProps {
  incorrect: number
}

export function Status (props: StatusProps) {
  return (
    <div className="Status" aria-hidden="true">
      <div className="Gallows" >
        <div className="Man">
          <div className={classNames({
            'head': true,
            'hidden': props.incorrect < (MAX_INCORRECT - 7)
          })}></div>
          <div className={classNames({
            'torso': true,
            'hidden': props.incorrect < (MAX_INCORRECT - 6)
          })}></div>
          <div className={classNames({
            'arm': true,
            'left': true,
            'hidden': props.incorrect < (MAX_INCORRECT - 5)
          })}></div>
          <div className={classNames({
            'arm': true,
            'right': true,
            'hidden': props.incorrect < (MAX_INCORRECT - 4)
          })}></div>
          <div className={classNames({
            'leg': true,
            'left': true,
            'hidden': props.incorrect < (MAX_INCORRECT - 3)
          })}></div>
          <div className={classNames({
            'foot': true,
            'left': true,
            'hidden': props.incorrect < (MAX_INCORRECT - 2)
          })}></div>
          <div className={classNames({
            'leg': true,
            'right': true,
            'hidden': props.incorrect < (MAX_INCORRECT - 1)
          })}></div>
          <div className={classNames({
            'foot': true,
            'right': true,
            'hidden': props.incorrect < MAX_INCORRECT
          })}></div>
        </div>
      </div>
    </div>
  );
}
