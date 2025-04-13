import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Circle, Text, Group } from 'react-konva';

const POCKETS = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6,
  27, 13, 36, 11, 30, 8, 23, 10, 5, 24,
  16, 33, 1, 20, 14, 31, 9, 22, 18, 29,
  7, 28, 12, 35, 3, 26
];

const getColor = (n) => {
  if (n === 0) return 'green';
  const reds = [32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3];
  return reds.includes(n) ? 'red' : 'black';
};

const WheelCanvas = ({ spinResult }) => {
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef();

  // Animate spin
  useEffect(() => {
    if (!spinResult) return;
    let frame = 0;
    const totalRotation = 1440 + (spinResult.position_index * (360 / 37)); // 4 spins + landing
    const animate = () => {
      if (frame <= 60) {
        const eased = totalRotation * (1 - Math.cos((Math.PI * frame) / 60)) / 2;
        setRotation(eased);
        frame++;
        requestAnimationFrame(animate);
      }
    };
    animate();
  }, [spinResult]);

  return (
    <Stage width={400} height={400}>
      <Layer>
        <Group x={200} y={200} rotation={rotation} ref={wheelRef}>
          {POCKETS.map((num, i) => {
            const angle = (360 / 37) * i;
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * 140;
            const y = Math.sin(rad) * 140;
            return (
              <Group rotation={angle} key={num}>
                <Text
                  text={num.toString()}
                  x={x - 10}
                  y={y - 10}
                  fill={getColor(num)}
                  fontSize={14}
                  fontStyle="bold"
                />
              </Group>
            );
          })}
          <Circle radius={150} stroke="black" strokeWidth={4} />
        </Group>
        <Circle x={200} y={200} radius={10} fill="white" shadowBlur={10} />
      </Layer>
    </Stage>
  );
};

export default WheelCanvas;
