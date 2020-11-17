import React, { useState } from 'react';
import styled from 'styled-components';
import { Squircle, DEFAULT_RATIO } from '../src';
import { NumberInput } from './NumberInput';

console.info('Enjoy ;)');

export function App() {
  const [radius, setRadius] = useState<number | null>(null);
  const [ratio, setRatio] = useState(0.03);
  const [size, setSize] = useState(200);

  return (
    <UIHolder>
      <UIOptions>
        <UIFormPart>
          <InputForm
            label={`Radius ${radius === null ? '(auto)' : ''}`}
            value={radius ?? 0}
            onChange={setRadius}
            min={10}
            max={200}
          />
          {radius !== null && (
            <button
              onClick={() => {
                setRadius(null);
              }}
            >
              Auto radius
            </button>
          )}
        </UIFormPart>
        <UIFormPart>
          <InputForm
            label="Roundess"
            value={ratio}
            onChange={setRatio}
            min={0}
            max={0.35}
            step={0.01}
          />
          <button
            onClick={() => {
              setRatio(DEFAULT_RATIO);
            }}
          >
            iOS Default
          </button>
        </UIFormPart>
        <InputForm
          label="Size"
          value={size}
          onChange={setSize}
          min={140}
          max={400}
        />
      </UIOptions>
      <UISquircleHolder>
        <SquircleBase
          className="demo"
          radius={radius ?? undefined}
          roundness={ratio}
          style={{
            height: size + 'px',
            width: size + 'px',
          }}
        >
          hello
        </SquircleBase>
      </UISquircleHolder>
      <UISquircleHolder>
        <ButtonSquircle
          className="demo"
          radius={radius ?? undefined}
          roundness={ratio}
          style={{
            height: size / 3 + 'px',
            width: size + 'px',
          }}
        >
          hello
        </ButtonSquircle>
      </UISquircleHolder>
    </UIHolder>
  );
}

const UIHolder = styled.div`
  padding: 40px;
`;

const UISquircleHolder = styled.div`
  margin-bottom: 30px;
`;

const UIOptions = styled.div`
  margin-bottom: 40px;
`;

const SquircleBase = styled(Squircle)``;

const ButtonSquircle = styled(SquircleBase)`
  font-size: 20px;
  padding-top: 3px;
`;

const InputForm = styled(NumberInput)`
  margin-bottom: 10px;
  margin-top: 10px;
  margin-right: 20px;
`;

const UIFormPart = styled.div`
  display: flex;
  align-items: center;
`;
