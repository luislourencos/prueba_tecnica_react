import React, { useState, useEffect } from 'react';
import { Range } from '../../components/Range/Range';
import { getRangeArray } from '../../api/range';

export const Exercice2 = () => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [rangeValues, setRangeValues] = useState([] as number[]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      (async () => {
        const data = getRangeArray();
        setMinValue(data.rangeValues[0]);
        setMaxValue(data.rangeValues[data.rangeValues.length - 1]);
        setRangeValues(data.rangeValues);
      })();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);
  console.log(rangeValues);
  return (
    <div>
      <h1>Exercice2</h1>
      {!loading && (
        <Range
          min={minValue}
          max={maxValue}
          onChangeMinValue={setMinValue}
          onChangeMaxValue={setMaxValue}
          range={rangeValues}
        />
      )}
    </div>
  );
};
