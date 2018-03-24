import React from 'react';

import github from './github.svg';

const Social = () => (
  <nav aria-label="Social links">
    <a
      href="https://github.com/gabrielpoca/datsplit"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img style={{ width: '50px' }} src={github} alt="Github" />
    </a>
  </nav>
);

export default Social;
