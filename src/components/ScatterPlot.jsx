import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

export const ScatterPlot = (props) => {
  const { xAxis, yAxis, data } = props;

  let xBottom;
  let yLeft;

  const graph = useRef();

  // SET DIMENSIONS
  const w = 600,
    h = 400,
    margin = {
      top: 40,
      bottom: 40,
      left: 40,
      right: 40,
    };

  const width = w - margin.left - margin.right,
    height = h - margin.top - margin.bottom;

  useEffect(() => {
    const g = d3.select(graph.current);

    // CLEAR BEFORE UPDATE
    g.selectAll('circle').remove();
    g.selectAll('text').remove();

    // SET SCALING
    let xMin = d3.min(data, (d) => +d.x * 0.9);
    let xMax = d3.max(data, (d) => +d.x * 1.1);
    let yMin = d3.min(data, (d) => +d.y * 0.9);
    let yMax = d3.max(data, (d) => +d.y * 1.1);

    const xScale = d3.scaleLinear().domain([xMin, xMax]).range([0, width]);
    const yScale = d3.scaleLinear().domain([yMax, yMin]).range([0, height]);

    // ADD POINTS
    g.selectAll('.circles')
      .data(data)
      .enter()
      .append('circle')
      .attr('r', 3)
      .attr('cx', (d) => xScale(d.x))
      .attr('cy', (d) => yScale(d.y))
      .attr('fill', 'lightsteelblue')
      .attr('opacity', '0.75');

    // SET AXES
    let xAxisFunction = d3.axisBottom().scale(xScale).ticks(5, 's');
    let yAxisFunction = d3.axisLeft().scale(yScale).ticks(5, 's');
    d3.select(xBottom).call(xAxisFunction);
    d3.select(yLeft).call(yAxisFunction);
  }, [data, height, width, xBottom, yLeft]);

  if (!data) return null;

  return (
    <div>
      <h2>{`${xAxis} vs ${yAxis}`}</h2>
      <svg width={w} height={h}>
        <g ref={graph} transform={`translate(${margin.left},${margin.top})`} />
        <g
          ref={(node) => {
            xBottom = node;
          }}
          transform={`translate(${margin.left}, ${h - margin.bottom})`}
        />
        <g
          ref={(node) => {
            yLeft = node;
          }}
          transform={`translate(${margin.left}, ${margin.top})`}
        ></g>
      </svg>
    </div>
  );
};
