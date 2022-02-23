import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

// INCOMPLETE

export const Histogram = (props) => {
  const { data } = props;

  let values = Object.values(data);
  let xBottom;

  const graph = useRef();

  const w = 200,
    h = 100,
    margin = {
      top: 20,
      bottom: 20,
      left: 20,
      right: 20,
    };

  const width = w - margin.left - margin.right,
    height = h - margin.top - margin.bottom;

  useEffect(() => {
    // CREATE HISTOGRAM
  }, [data]);

  return (
    <>
      <svg width={w} height={h}>
        <g ref={graph} transform={`translate(${margin.left},${margin.top})`} />
      </svg>
    </>
  );
};
