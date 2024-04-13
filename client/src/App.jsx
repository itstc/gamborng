import React from 'react';
import rocketLogo from './rocket.png';

export default function App() {
  return (<div>
    <img src={rocketLogo} className="logo" alt="Discord" />
    <h1>Hello, World!</h1>
    ${JSON.stringify(import.meta.env)}
  </div>);
}