import React, { useState, useEffect } from 'react';
import { Range } from '../../components/Range/Range';
import { getRangeArray } from '../../api/range';
import { Feedback } from '../../components';
import { Spinner } from '../../components/Spinner/Spinner';

export const Exercice2 = () => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [rangeValues, setRangeValues] = useState([] as number[]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      (async () => {
        const data = await getRangeArray();
        setMinValue(data.rangeValues[0]);
        setMaxValue(data.rangeValues[data?.rangeValues?.length - 1]);
        setRangeValues(data.rangeValues);
        setLoading(false);
      })();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div data-testid="exercice2">
      {!loading && (
        <Range
          min={minValue}
          max={maxValue}
          onChangeMinValue={setMinValue}
          onChangeMaxValue={setMaxValue}
          range={rangeValues.length > 0 ? rangeValues : []}
        />
      )}
      <Feedback text={error} />
    </div>
  );
};
