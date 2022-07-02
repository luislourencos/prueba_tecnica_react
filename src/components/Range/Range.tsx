import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Input } from '../Input';
import './styles.css';
import { isMobile } from 'react-device-detect';
import { closestIndexArray } from './utils/closestIndexArray';
import { convertRangeToRangePerc } from './utils/convertRangeToRangePerc';
import { convertPositionToPerc } from './utils/convertPositionToPerc';
import { convertPercToPosition } from './utils/convertPrecToPosition';

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
  const [rangePositionsPerc, setRangePositionPerc] = useState([] as number[]);

  useEffect(() => {
    setRangePositionPerc(
      range && containerWidth ? convertRangeToRangePerc(range) : []
    );
  }, [range, containerWidth]);

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
  const calculateValueDotLeft = (percent: number) => {
    if (range) {
      return range[closestIndexArray(percent, rangePositionsPerc)];
    } else {
      return (((max - min) * percent) / 100 + min).toFixed(0);
    }
  };
  const calculateValueDotRight = (percent: number) => {
    if (range) {
      return range[closestIndexArray(100 - percent, rangePositionsPerc)];
    } else {
      return (((max - min) * (100 - percent)) / 100 + min).toFixed(0);
    }
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

      if (!positionToNotCross()) {
        setActivateDot1(false);
        setLeftPosition(leftPosition - 1);
      } else {
        setLeftPosition(leftPosition);
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
      const positionPercLeft = convertPositionToPerc(
        leftPosition,
        containerWidth
      );
      const positionPercRight = convertPositionToPerc(
        rightPosition,
        containerWidth
      );
      const newPositionLeft =
        rangePositionsPerc[
          closestIndexArray(positionPercLeft, rangePositionsPerc)
        ];
      const newPositionRight =
        rangePositionsPerc[
          closestIndexArray(positionPercRight, rangePositionsPerc)
        ];
      setLeftPosition(convertPercToPosition(newPositionLeft, containerWidth));
      setRightPosition(convertPercToPosition(newPositionRight, containerWidth));
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
            left: `${convertPositionToPerc(leftPosition, containerWidth) -
              compensationWidth}%`,
          }}
          ref={dotLeft}
          onMouseDown={(__) => onMouseDown('dot1')}
          onTouchStart={(__) => onMouseDown('dot1')}
        >
          <div className="info-dot">
            {calculateValueDotLeft(
              convertPositionToPerc(leftPosition, containerWidth)
            )}
          </div>
        </div>
        <div
          className="dot primary-background"
          style={{
            right: `${convertPositionToPerc(rightPosition, containerWidth) -
              compensationWidth}%`,
          }}
          ref={dotRight}
          onMouseDown={(__) => onMouseDown('dot2')}
          onTouchStart={(__) => onMouseDown('dot2')}
        >
          <div className="info-dot">
            {calculateValueDotRight(
              convertPositionToPerc(rightPosition, containerWidth)
            )}
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
