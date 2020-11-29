import React from 'react';

import Grudges from './Grudges';
import NewGrudge from './NewGrudge';

const Application = () => {
  // const addGrudge = (grudge) => {
  //   grudge.id = id();
  //   grudge.forgiven = false;
  //   // setGrudges([grudge, ...grudges]);
  // };

  // const toggleForgiveness = (id) => {
  // setGrudges(
  //   grudges.map(grudge => {
  //     if (grudge.id !== id) return grudge;
  //     return { ...grudge, forgiven: !grudge.forgiven };
  //   })
  // );
  // };

  return (
    <div className="Application">
      <NewGrudge />
      <Grudges />
    </div>
  );
};

export default Application;
