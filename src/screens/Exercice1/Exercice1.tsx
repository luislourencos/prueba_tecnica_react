import React, { useEffect, useState } from 'react';
import { getRangeMinAndMax } from '../../api/range';
import { Range } from '../../components/Range/Range';

export const Exercice1 = () => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      (async () => {
        const data = await getRangeMinAndMax();
        setMinValue(data.min);
        setMaxValue(data.max);
      })();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div>
      <h1>Exercice1</h1>
      {!loading && (
        <Range
          min={minValue}
          max={maxValue}
          onChangeMinValue={setMinValue}
          onChangeMaxValue={setMaxValue}
        />
      )}
    </div>
  );
};
