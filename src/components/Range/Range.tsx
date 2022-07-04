import React, {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  ChangeEvent,
} from 'react';
import { Input } from '../Input';
import './styles.css';
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
  const [activateDotLeft, setActivateDotLeft] = useState(false);
  const [activateDotRight, setActivateDotRight] = useState(false);
  const compensationWidth = ((dotWidth / 2) * 100) / containerWidth;
  const [rangePositionsPerc, setRangePositionPerc] = useState([] as number[]);

  useEffect(() => {
    setRangePositionPerc(
      range && containerWidth ? convertRangeToRangePerc(range) : []
    );
  }, [containerWidth, range]);

  useLayoutEffect(() => {
    setContainerWidth(containerRef.current.offsetWidth);
    setContainerWidthLeft(containerRef.current.offsetLeft);
    setDotWidth(dotLeft.current.offsetWidth);
  }, []);

  const findPosition = (value: number) => {
    let position = 0;
    if (activateDotLeft) {
      position = value - containerWidthLeft;
    } else {
      position = containerWidth - value + containerWidthLeft;
    }
    position = Math.max(position, 0);
    position = Math.min(position, containerWidth);
    return parseInt(position.toFixed(0));
  };

  const calculateValueDotLeft = (percent: number) => {
    if (range) {
      const value = range[closestIndexArray(percent, rangePositionsPerc)];
      setTimeout(() => onChangeMinValue(value));

      return value;
    } else {
      return (((max - min) * percent) / 100 + min).toFixed(0);
    }
  };
  const calculateValueDotRight = (percent: number) => {
    if (range) {
      const value = range[closestIndexArray(100 - percent, rangePositionsPerc)];
      setTimeout(() => onChangeMaxValue(value));
      return value;
    } else {
      return (((max - min) * (100 - percent)) / 100 + min).toFixed(0);
    }
  };

  const positionToNotCross = () =>
    containerWidth - (rightPosition + leftPosition) > 0;

  // Mouse Events
  const onMouseDown = (type: string) => {
    type == 'dotLeft' ? setActivateDotLeft(true) : setActivateDotRight(true);
  };

  const onMouseMouve = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const clientX = e.clientX;
    if (activateDotLeft && findPosition(clientX) % 2) {
      const leftPosition = findPosition(clientX);

      if (!positionToNotCross()) {
        setActivateDotLeft(false);
        setLeftPosition(leftPosition - 1);
      } else {
        setLeftPosition(leftPosition);
      }
    } else if (activateDotRight && findPosition(clientX) % 2) {
      const rightPosition = findPosition(clientX);
      setRightPosition(rightPosition);
      if (!positionToNotCross()) {
        setActivateDotRight(false);
        setRightPosition(rightPosition - 1);
      } else {
        setLeftPosition(leftPosition);
      }
    }
  };

  const onMouseUp = () => {
    setActivateDotLeft(false);
    setActivateDotRight(false);
    dragDotWhenHaveRange();
  };

  const dragDotWhenHaveRange = () => {
    if (range) {
      const positionPercLeft = convertPositionToPerc(
        leftPosition,
        containerWidth
      );
      const positionPercRight = convertPositionToPerc(
        rightPosition,
        containerWidth
      );

      let newPositionLeft =
        rangePositionsPerc[
          closestIndexArray(positionPercLeft, rangePositionsPerc)
        ];
      let newPositionRight =
        rangePositionsPerc[
          closestIndexArray(positionPercRight, rangePositionsPerc)
        ];

      const positionCross = 100 - (newPositionLeft + newPositionRight);
      const stepsPerc = 100 / (range?.length - 1);
      // Condition to not cross bullets
      if (positionCross < stepsPerc) {
        if (newPositionLeft > newPositionRight) {
          newPositionLeft =
            rangePositionsPerc[
              closestIndexArray(positionPercLeft, rangePositionsPerc) - 1
            ];
        } else {
          newPositionRight =
            rangePositionsPerc[
              closestIndexArray(positionPercRight, rangePositionsPerc) - 1
            ];
        }
      }

      setLeftPosition(convertPercToPosition(newPositionLeft, containerWidth));
      setRightPosition(convertPercToPosition(newPositionRight, containerWidth));
    }
  };
  return (
    <div
      className="range"
      onMouseUp={() => onMouseUp()}
      onMouseLeave={() => onMouseUp()}
      data-testid="range"
    >
      <Input
        value={min}
        disable={range?.length > 0}
        onChange={onChangeMinValue}
      />

      <div
        className="container"
        ref={containerRef}
        onMouseMove={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          onMouseMouve(e)
        }
      >
        <div
          className="dot"
          style={{
            left: `${convertPositionToPerc(leftPosition, containerWidth) -
              compensationWidth}%`,
          }}
          ref={dotLeft}
          onMouseDown={(__) => onMouseDown('dotLeft')}
          data-testid="dot-left"
        >
          <div className="info-dot" data-testid="dot-left-value">
            {calculateValueDotLeft(
              convertPositionToPerc(leftPosition, containerWidth)
            )}
            €
          </div>
        </div>
        <div
          className="dot primary-background"
          style={{
            right: `${convertPositionToPerc(rightPosition, containerWidth) -
              compensationWidth}%`,
          }}
          ref={dotRight}
          onMouseDown={(__) => onMouseDown('dotRight')}
          data-testid="dot-right"
        >
          <div className={'info-dot'} data-testid="dot-right-value">
            {calculateValueDotRight(
              convertPositionToPerc(rightPosition, containerWidth)
            )}
            €
          </div>
        </div>
      </div>
      <Input
        value={max}
        disable={range?.length > 0}
        onChange={onChangeMaxValue}
      />
    </div>
  );
};
