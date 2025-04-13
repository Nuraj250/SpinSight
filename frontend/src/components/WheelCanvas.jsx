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

const WheelCanvas = ({ spinResult, history = [] }) => {
  const [rotation, setRotation] = useState(0);
  const [ballRotation, setBallRotation] = useState(0);

  useEffect(() => {
    if (!spinResult) return;
    let frame = 0;
    const wheelTarget = 1440 + (spinResult.position_index * (360 / 37));
    const ballTarget = 1800;

    const animate = () => {
      if (frame <= 60) {
        const eased = (t) => (1 - Math.cos(Math.PI * t)) / 2;
        const progress = eased(frame / 60);
        setRotation(wheelTarget * progress);
        setBallRotation(ballTarget * (1 - progress));
        frame++;
        requestAnimationFrame(animate);
      }
    };
    animate();
  }, [spinResult]);

  const freq = {};
  history.forEach((h) => {
    freq[h.pocket] = (freq[h.pocket] || 0) + 1;
  });

  const maxCount = Math.max(...Object.values(freq), 1);

  return (
    <Stage width={400} height={400}>
      <Layer>
        <Group x={200} y={200} rotation={rotation}>
          {POCKETS.map((num, i) => {
            const angle = (360 / 37) * i;
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * 140;
            const y = Math.sin(rad) * 140;

            const baseColor = getColor(num);
            const timesLanded = freq[num] || 0;

            const isHot = timesLanded >= maxCount * 0.6;
            const isCold = timesLanded === 0;

            const glow = isHot ? "orange" : isCold ? "cyan" : "white";
            const fontWeight = isHot ? "bold" : "normal";
            const fontSize = isHot ? 18 : 14;

            return (
              <Group rotation={angle} key={num}>
                <Text
                  text={num.toString()}
                  x={x - 10}
                  y={y - 10}
                  fill={baseColor}
                  fontSize={fontSize}
                  fontStyle={fontWeight}
                  shadowColor={glow}
                  shadowBlur={isHot || isCold ? 10 : 0}
                  shadowEnabled={isHot || isCold}
                />
              </Group>
            );
          })}
          <Circle radius={150} stroke="black" strokeWidth={4} />
        </Group>

        {/* Spinning Ball */}
        <Group x={200} y={200} rotation={ballRotation}>
          <Circle
            x={0}
            y={-120}
            radius={8}
            fill="white"
            shadowBlur={10}
            stroke="gray"
            strokeWidth={1}
          />
        </Group>
      </Layer>
    </Stage>
  );
};

export default WheelCanvas;
