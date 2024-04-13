import React from 'react';
import rocketLogo from './rocket.png';

export default () => {
    return (<div>
      <img src={rocketLogo} class="logo" alt="Discord" />
      <h1>Hello, World!</h1>
      ${JSON.stringify(import.meta.env)}
    </div>);
}