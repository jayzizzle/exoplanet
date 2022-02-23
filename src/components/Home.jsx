import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import exoplanetData from '../docs/exoplanet.csv';
import { SelectAxes } from './SelectAxes';

import { Test } from './Test';

// HAPPY HOLIDAYS AND THANK YOU FOR THIS OPPORTUNITY!
// This is my first experience with D3 so I spent a majority of time doing some research on the library.
// Here are a couple notes:
// I 'hard coded' only the CSV columns that contained positive numeric values (also non-exponent).
// I was unable to finish adding the Histogram.
// If given more time, I would also go back and refactor a few things to be more DRY,
// Do more styling,
// And optimize the D3 portions better.

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
