import React from 'react';

export const Test = (props) => {
  const { data } = props;

  if (!data) return null;
  return (
    <div>
      <h1>Begin testing section.</h1>

      <h1>End testing section.</h1>
    </div>
  );
};
