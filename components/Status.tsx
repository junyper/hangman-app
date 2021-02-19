import classNames from 'classnames';
import React from 'react';
import styles from './Status.module.css';

interface StatusProps {
  incorrect: number;
}

export const MAX_INCORRECT = 8;

export function Status(props: StatusProps): JSX.Element {
  return (
    <div className={styles.Status} aria-hidden="true">
      <div className={styles.Gallows}>
        <div className={styles.Man}>
          <div className={classNames(styles.head, props.incorrect >= 1 ? styles.visible : styles.hidden)}></div>
          <div className={classNames(styles.torso, props.incorrect >= 2 ? styles.visible : styles.hidden)}></div>
          <div
            className={classNames(styles.arm, styles.left, props.incorrect >= 3 ? styles.visible : styles.hidden)}
          ></div>
          <div
            className={classNames(styles.arm, styles.right, props.incorrect >= 4 ? styles.visible : styles.hidden)}
          ></div>
          <div
            className={classNames(styles.leg, styles.left, props.incorrect >= 5 ? styles.visible : styles.hidden)}
          ></div>
          <div
            className={classNames(styles.foot, styles.left, props.incorrect >= 6 ? styles.visible : styles.hidden)}
          ></div>
          <div
            className={classNames(styles.leg, styles.right, props.incorrect >= 7 ? styles.visible : styles.hidden)}
          ></div>
          <div
            className={classNames(styles.foot, styles.right, props.incorrect >= 8 ? styles.visible : styles.hidden)}
          ></div>
        </div>
      </div>
    </div>
  );
}
