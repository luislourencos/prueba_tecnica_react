import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Input } from '../Input';
import './styles.css';
import { isMobile } from 'react-device-detect';

export const Range = ({
  min = 1,
  max = 100,
  onChangeMinValue,
  onChangeMaxValue,
  range,
}: IRange) => {
  console.log(isMobile);
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
  const [rangePositionsPerc, setRangePositionPerc] = useState([] as number[]);

  const closestIndex = (num: number, arr: number[]) => {
    var curr = arr[0],
      diff = Math.abs(num - curr),
      index = 0;

    for (var val = 0; val < arr.length; val++) {
      let newdiff = Math.abs(num - arr[val]);
      if (newdiff < diff) {
        diff = newdiff;
        curr = arr[val];
        index = val;
      }
    }
    return index;
  };

  console.log(closestIndex(30, rangePositionsPerc));

  useEffect(() => {
    if (range && containerWidth) {
      let _range = [] as number[];
      const stepsPerc = 100 / (range.length - 1);
      range.forEach((__, index) => {
        if (index === 0) {
          _range.push(0);
        } else {
          _range.push(_range[_range.length - 1] + stepsPerc);
        }
      });
      setRangePositionPerc(_range);
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
    return parseInt(position.toFixed(0));
  };
  const findPositionLeft = (value: number) => {
    let position = value - containerWidthLeft;
    position = Math.max(position, 0);
    position = Math.min(position, containerWidth);
    return parseInt(position.toFixed(0));
  };
  const calculateValueDot1 = (percent: number) => {
    if (range) {
      return range[closestIndex(percent, rangePositionsPerc)];
    } else {
      return (((max - min) * percent) / 100 + min).toFixed(0);
    }
  };
  const calculateValueDot2 = (percent: number) => {
    if (range) {
      return range[closestIndex(100 - percent, rangePositionsPerc)];
    } else {
      return (((max - min) * (100 - percent)) / 100 + min).toFixed(0);
    }
  };
  const convertPositionToPerc = (value: number) => {
    const _value = (value * 100) / containerWidth;
    return parseInt(_value.toFixed(0));
  };
  const convertPercToPosition = (value: number) => {
    const _value = (value * containerWidth) / 100;
    return parseInt(_value.toFixed(2));
  };
  const positionToNotCross = () =>
    containerWidth - (rightPosition + leftPosition) > 0;

  const onMouseDown = (type: string) => {
    type == 'dot1' ? setActivateDot1(true) : setActivateDot2(true);
  };

  const onMouseMouve = (e: any) => {
    const clientX = isMobile ? e.touches[0].clientX : e.clientX;
    if (activateDot1 && findPositionLeft(clientX) % 2) {
      const leftPosition = findPositionLeft(clientX);
      if (range) {
        if (!positionToNotCross()) {
          setActivateDot1(false);
          setLeftPosition(leftPosition - 1);
        } else {
          setLeftPosition(leftPosition);
        }
      } else {
        if (!positionToNotCross()) {
          setActivateDot1(false);
          setLeftPosition(leftPosition - 1);
        } else {
          setLeftPosition(leftPosition);
        }
      }
    } else if (activateDot2 && findPositionRight(clientX) % 2) {
      const rightPosition = findPositionRight(clientX);
      setRightPosition(rightPosition);
      if (!positionToNotCross()) {
        setActivateDot2(false);
        setRightPosition(rightPosition - 1);
      } else {
        setLeftPosition(leftPosition);
      }
    }
  };

  const onMouseUp = () => {
    setActivateDot1(false);
    setActivateDot2(false);
    if (range) {
      const positionPercLeft = convertPositionToPerc(leftPosition);
      const positionPercRight = convertPositionToPerc(rightPosition);
      const newPositionLeft =
        rangePositionsPerc[closestIndex(positionPercLeft, rangePositionsPerc)];
      const newPositionRight =
        rangePositionsPerc[closestIndex(positionPercRight, rangePositionsPerc)];
      setLeftPosition(convertPercToPosition(newPositionLeft));
      setRightPosition(convertPercToPosition(newPositionRight));
    }
  };
  return (
    <div
      className="range"
      onMouseUp={() => onMouseUp()}
      onMouseLeave={() => onMouseUp()}
      onTouchEnd={() => onMouseUp()}
    >
      {range ? (
        <p className="input">{min}</p>
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
        className="container"
        ref={containerRef}
        onMouseMove={(e: any) => onMouseMouve(e)}
        onTouchMove={(e: any) => onMouseMouve(e)}
      >
        <div
          className="dot"
          style={{
            left: `${convertPositionToPerc(leftPosition) - compensationWidth}%`,
          }}
          ref={dotLeft}
          onMouseDown={(__) => onMouseDown('dot1')}
          onTouchStart={(__) => onMouseDown('dot1')}
        >
          <div className="info-dot">
            {calculateValueDot1(convertPositionToPerc(leftPosition))}
          </div>
        </div>
        <div
          className="dot primary-background"
          style={{
            right: `${convertPositionToPerc(rightPosition) -
              compensationWidth}%`,
          }}
          ref={dotRight}
          onMouseDown={(__) => onMouseDown('dot2')}
          onTouchStart={(__) => onMouseDown('dot2')}
        >
          <div className="info-dot">
            {calculateValueDot2(convertPositionToPerc(rightPosition))}
          </div>
        </div>
      </div>
      {range ? (
        <p className="input">{max}</p>
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
