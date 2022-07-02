import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Input } from '../Input';
import './styles.css';

export const Range = ({
  min = 1,
  max = 100,
  onChangeMinValue,
  onChangeMaxValue,
  range,
}: IRange) => {
  const dotLeft = useRef<HTMLDivElement>(null);
  const dotRight = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerWidthLeft, setContainerWidthLeft] = useState(0);
  const [dotWidth, setDotWidth] = useState(0);
  const [leftPosition, setLeftPosition] = useState(0);
  const [rightPosition, setRightPosition] = useState(0);
  const [activateDot1, setActivateDot1] = useState(false);
  const [activateDot2, setActivateDot2] = useState(false);
  const compensationWidth = ((dotWidth / 2) * 100) / containerWidth;
  const [rangePositions, setRangePosition] = useState([] as number[]); // range position

  useEffect(() => {
    if (range && containerWidth) {
      const separationWidth = containerWidth / range?.length - 1;
      let _range = [] as number[];

      range.forEach((element, index) => {
        if (index === 0) {
          _range.push(0);
        } else {
          _range.push(_range[_range.length - 1] + separationWidth);
        }
      });

      setRangePosition(_range);
    }
  }, [containerRef, range, containerWidth]);
  useLayoutEffect(() => {
    setContainerWidth(containerRef.current.offsetWidth);
    setContainerWidthLeft(containerRef.current.offsetLeft);
    setDotWidth(dotLeft.current.offsetWidth);
  }, []);

  const findPositionRight = (value: number) => {
    let position = containerWidth - value + containerWidthLeft;
    position = Math.max(position, 0);
    position = Math.min(position, containerWidth);
    return parseInt(
      positionToNotCross()
        ? position.toFixed(0)
        : (containerWidth / 2 - 1).toFixed(0)
    );
  };
  const findPositionLeft = (value: number) => {
    let position = value - containerWidthLeft;
    console.log(containerWidthLeft);
    console.log(position);
    position = Math.max(position, 0);
    position = Math.min(position, containerWidth);
    console.log({ position });
    return parseInt(
      positionToNotCross()
        ? position.toFixed(0)
        : (containerWidth / 2 - 1).toFixed(0)
    );
  };
  const calculateValueDot1 = (percent: number) => {
    return (((max - min) * percent) / 100 + min).toFixed(0);
  };
  const calculateValueDot2 = (percent: number) => {
    return (((max - min) * (100 - percent)) / 100 + min).toFixed(0);
  };
  const convertPerc = (value: number) => {
    const _value = (value * 100) / containerWidth;
    return parseInt(_value.toFixed(0));
  };
  const positionToNotCross = () =>
    containerWidth - (rightPosition + leftPosition) > 0;

  const onMouseDown = (type: string) =>
    type == 'dot1' ? setActivateDot1(true) : setActivateDot2(true);

  const onMouseMouve = (e: React.MouseEvent<HTMLInputElement>) => {
    if (activateDot1 && findPositionLeft(e.clientX) % 2) {
      setLeftPosition(findPositionLeft(e.clientX));
    } else if (activateDot2 && findPositionRight(e.clientX) % 2) {
      setRightPosition(findPositionRight(e.clientX));
    }
  };

  const onMouseUp = () => {
    setActivateDot1(false);
    setActivateDot2(false);
  };
  return (
    <div
      className="range"
      onMouseUp={() => onMouseUp()}
      onMouseLeave={() => onMouseUp()}
    >
      <div
        className="range-container"
        style={{
          left: containerWidthLeft,
          width: containerWidth + containerWidthLeft - dotWidth * 2,
        }}
      >
        {range &&
          range.map((element: number, index: number) => (
            <div key={index} className="range-item" />
          ))}
      </div>
      {range ? (
        <p>{min}</p>
      ) : (
        <input
          type="number"
          value={min}
          className="input"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = parseInt(e.target.value) as number;
            onChangeMinValue(value);
          }}
        />
      )}

      <div
        className="container tertary-background"
        ref={containerRef}
        onMouseMove={(e: React.MouseEvent<HTMLInputElement>) => onMouseMouve(e)}
      >
        <div
          className="dot"
          style={{
            left: `${convertPerc(leftPosition) - compensationWidth}%`,
          }}
          ref={dotLeft}
          onMouseDown={(__) => onMouseDown('dot1')}
        >
          <div className="info-dot">
            {calculateValueDot1(convertPerc(leftPosition))}
          </div>
        </div>
        <div
          className="dot primary-background"
          style={{
            right: `${convertPerc(rightPosition) - compensationWidth}%`,
          }}
          ref={dotRight}
          onMouseDown={(__) => onMouseDown('dot2')}
        >
          <div className="info-dot">
            {calculateValueDot2(convertPerc(rightPosition))}
          </div>
        </div>
      </div>
      {range ? (
        <p>{max}</p>
      ) : (
        <input
          type="number"
          value={max}
          className="input"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = parseInt(e.target.value) as number;
            onChangeMaxValue(value);
          }}
        />
      )}
    </div>
  );
};
