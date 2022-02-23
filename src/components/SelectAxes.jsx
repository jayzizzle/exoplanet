import React, { useState, useRef } from 'react';
import { headings } from '../util/data';
// import { Histogram } from './Histogram';
import { ScatterPlot } from './ScatterPlot';

export const SelectAxes = (props) => {
  const { data } = props;

  // SET DEFAULT VALUES
  const [xAxis, setXAxis] = useState(headings[0]);
  const [yAxis, setYAxis] = useState(headings[1]);

  // SAVE VARIABLES
  const xValues = useRef();
  const yValues = useRef();

  // FIGURE OUT HOW TO SELECT ONLY COLUMNS WITH NUMERIC VALUES
  // const headings = Object.keys(data[0]);

  const dropDown = (axis) => {
    return (
      <div className='axis'>
        <label>
          {`Select ${axis}-Axis:`}
          <br />
          <select
            onChange={(e) => handleChange(e.target.value, axis)}
            defaultValue={axis === 'x' ? xAxis : yAxis}
          >
            {headings.map((heading, i) => (
              <option value={heading} key={i}>
                {heading}
              </option>
            ))}
          </select>
        </label>
        {/* ADD HISTOGRAM HERE */}
        {/* <Histogram
          data={axis === 'x' ? xValues : yValues}
        /> */}
      </div>
    );
  };

  const handleChange = (value, axis) => {
    axis === 'x' ? setXAxis(value) : setYAxis(value);
  };

  const getValuePairs = () => {
    let dataPairs = [];
    let xValuesArray = [];
    let yValuesArray = [];
    for (let i = 0; i < data.length; i++) {
      // SET DATA PAIRS
      dataPairs.push({ x: data[i][xAxis], y: data[i][yAxis] });

      // SET SINGLE VALUES FOR HISTOGRAM
      xValuesArray.push(data[i][xAxis]);
      yValuesArray.push(data[i][yAxis]);
      xValues.current = xValuesArray;
      yValues.current = yValuesArray;
    }
    return dataPairs;
  };

  if (!data) return null;

  return (
    <>
      <div className='select-axes'>
        {dropDown('x')}
        {dropDown('y')}
      </div>
      <ScatterPlot xAxis={xAxis} yAxis={yAxis} data={getValuePairs()} />
    </>
  );
};
