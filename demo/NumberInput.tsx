import React from 'react';
import styled from 'styled-components';

interface Props {
  label: string;
  value: number;
  max: number;
  min: number;
  step?: number;
  onChange(value: number): void;
  className?: string;
}

export function NumberInput({
  label,
  max,
  min,
  value,
  onChange,
  step,
  className,
}: Props) {
  return (
    <UIHolder className={className}>
      <UILabel>{label}</UILabel>
      <UIInputHolder>
        <UIInput
          type="range"
          max={max}
          min={min}
          value={value}
          step={step}
          onChange={event => {
            onChange(parseFloat(event.target.value));
          }}
        />
      </UIInputHolder>
    </UIHolder>
  );
}

const UIHolder = styled.div``;

const UILabel = styled.div``;

const UIInputHolder = styled.div``;

const UIInput = styled.input``;
