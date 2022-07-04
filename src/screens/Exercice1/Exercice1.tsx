import React, { useEffect, useState } from 'react';
import { getRangeMinAndMax } from '../../api/range';
import { Feedback } from '../../components';
import { Range, Spinner } from '../../components';

export const Exercice1 = () => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [error, setError] = useState('');
  const [referenceMin, setReferenceMin] = useState(0);
  const [referenceMax, setReferenceMax] = useState(0);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      (async () => {
        const data = await getRangeMinAndMax();
        setMinValue(data.min);
        setMaxValue(data.max);
        setReferenceMin(data.min);
        setReferenceMax(data.max);
      })();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handlerChange = (type: 'max' | 'min', value: number) => {
    error && setError('');
    if (value < referenceMin) {
      type === 'min' ? setMinValue(referenceMin) : setMaxValue(referenceMin);
      setError(`The value need to be bigeer than ${referenceMin}`);
    } else if (value > referenceMax) {
      type === 'min' ? setMinValue(referenceMax) : setMaxValue(referenceMax);
      setError(`The value need to be smaller than ${referenceMax}`);
    } else {
      type === 'min' ? setMinValue(value) : setMaxValue(value);
    }
  };
  if (loading) {
    return <Spinner />;
  }
  return (
    <div data-testid="exercice1">
      {!loading && (
        <Range
          min={minValue}
          max={maxValue}
          onChangeMinValue={(value: number) => handlerChange('min', value)}
          onChangeMaxValue={(value: number) => handlerChange('max', value)}
        />
      )}
      <Feedback text={error} />
    </div>
  );
};
