import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Circle, Text, Group } from 'react-konva';

const WHEEL_RADIUS = 150;
const CENTER_X = 200;
const CENTER_Y = 200;
const NUM_SEGMENTS = 37;

const getColor = (pocket) => {
  if (pocket === 0) return 'green';
  const reds = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
  return reds.includes(pocket) ? 'red' : 'black';
};

const WheelCanvas = ({ resultPocket, onAnimationEnd, glow }) => {
  const [angle, setAngle] = useState(0);
  const animRef = useRef(null);

  useEffect(() => {
    if (resultPocket !== null) {
      let frame = 0;
      const totalFrames = 100;
      const baseAngle = (2 * Math.PI * resultPocket) / NUM_SEGMENTS;

      const animate = () => {
        frame++;
        const progress = frame / totalFrames;
        const eased = 1 - Math.pow(1 - progress, 3);
        const targetAngle = 10 * 2 * Math.PI + baseAngle;
        setAngle(targetAngle * eased);
        if (frame < totalFrames) {
          animRef.current = requestAnimationFrame(animate);
        } else {
          onAnimationEnd && onAnimationEnd();
        }
      };
      animate();
      return () => cancelAnimationFrame(animRef.current);
    }
  }, [resultPocket, onAnimationEnd]);

  const ballX = CENTER_X + (WHEEL_RADIUS - 15) * Math.cos(angle);
  const ballY = CENTER_Y + (WHEEL_RADIUS - 15) * Math.sin(angle);

  return (
    <Stage width={400} height={400}>
      <Layer>
        <Circle
          x={CENTER_X}
          y={CENTER_Y}
          radius={WHEEL_RADIUS}
          stroke="gold"
          strokeWidth={4}
          shadowColor={glow ? 'gold' : ''}
          shadowBlur={glow ? 30 : 0}
          shadowOpacity={0.6}
        />

        {[...Array(NUM_SEGMENTS)].map((_, i) => {
          const theta = (2 * Math.PI * i) / NUM_SEGMENTS;
          const textX = CENTER_X + (WHEEL_RADIUS - 30) * Math.cos(theta);
          const textY = CENTER_Y + (WHEEL_RADIUS - 30) * Math.sin(theta);
          return (
            <Group key={i}>
              <Text
                x={textX - 10}
                y={textY - 10}
                text={`${i}`}
                fontSize={12}
                fontStyle="bold"
                fill={getColor(i)}
              />
            </Group>
          );
        })}

        <Circle
          x={ballX}
          y={ballY}
          radius={8}
          fill="white"
          stroke="black"
          strokeWidth={1}
        />
      </Layer>
    </Stage>
  );
};

export default WheelCanvas;
