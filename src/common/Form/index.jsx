import React from 'react';

import styles from './index.css';

export const Form = props => <form {...props} className={styles.root} />;

export const Fieldset = props => (
  <div className={styles.row}>{props.children}</div>
);

export const Label = props => (
  <label {...props} className={styles.label}>
    {props.children}
  </label>
);

export const Error = props => (
  <div className={styles.error}>{props.children}</div>
);

export const Actions = props => (
  <Fieldset>
    <div className={styles.actions}>{props.children}</div>
  </Fieldset>
);
