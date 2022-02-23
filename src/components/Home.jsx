import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import exoplanetData from '../docs/exoplanet.csv';
import { SelectAxes } from './SelectAxes';

import { Test } from './Test';

export const Home = () => {
  const [results, setResults] = useState();

  // GET DATA ON LOAD
  useEffect(() => {
    d3.csv(exoplanetData)
      .then((data) => {
        setResults(data);
      })
      .catch((err) => console.log('Error loading or parsing data.'));
  }, []);

  if (!results) return null;
  return (
    <div className='home-container'>
      <Test data={results} />
      <h1>Exoplanet Data Explorer</h1>
      <SelectAxes data={results} />
    </div>
  );
};
