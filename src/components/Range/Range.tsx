import React, {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  ChangeEvent,
} from 'react';
import { Input } from '../Input';
import './styles.css';
interface IRange {
  min: number;
  max: number;
  onChangeMinValue?: (number: number) => void;
  onChangeMaxValue?: (number: number) => void;
  range?: number[];
}
export const Range = ({
  min = 1,
  max = 100,
  onChangeMinValue,
  onChangeMaxValue,
  range,
}: IRange) => {
  // The current position of mouse

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

  useLayoutEffect(() => {
    setContainerWidth(containerRef.current.offsetWidth);
    setContainerWidthLeft(containerRef.current.offsetLeft);

    console.log('CONTAINER', {
      width: containerRef.current.clientWidth,
      left: containerRef.current.offsetLeft,
    });
    console.log('Left', {
      width: dotLeft.current.clientWidth,
      left: dotLeft.current.offsetLeft,
    });
    console.log('Right', {
      width: dotRight.current.offsetWidth,
      left: dotRight.current.offsetLeft,
    });

    console.log({
      leftWidth: dotLeft.current.offsetWidth,
      rightWidth: dotRight.current.offsetWidth,
    });
    setDotWidth(dotLeft.current.offsetWidth);
  }, []);

  const findPositionRight = (value: number) => {
    console.log({
      containerWidth,
      containerWidthLeft,
      right: dotLeft.current.offsetLeft,
      value,
      sameValueContainer: value - containerWidthLeft + dotWidth,
      position: containerWidth - value - dotWidth + containerWidthLeft,
    });
    let position = containerWidth - value - dotWidth + containerWidthLeft;
    console.log('rightPosition', position);
    return parseInt(position.toFixed(0));
  };
  const findPositionLeft = (value: number) => {
    let position = value - dotWidth - containerWidthLeft;
    return parseInt(position.toFixed(0));
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

      {/* <div
        style={{
          width: containerWidth - containerWidthLeft,

          backgroundColor: 'green',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {range &&
          range.map(() => {
            return <p>O</p>;
          })}
      </div> */}
      <div
        className="container tertary-background"
        ref={containerRef}
        onMouseMove={(e: React.MouseEvent<HTMLInputElement>) => onMouseMouve(e)}
      >
        <div
          className="dot"
          style={{ left: `${convertPerc(leftPosition)}%` }}
          ref={dotLeft}
          onMouseDown={(__) => onMouseDown('dot1')}
        >
          <div className="info-dot">
            {calculateValueDot1(convertPerc(leftPosition))}
          </div>
        </div>
        <div
          className="dot primary-background"
          style={{ right: `${convertPerc(rightPosition)}%` }}
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
