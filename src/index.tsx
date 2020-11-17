import React, {
  CSSProperties,
  HTMLAttributes,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createMemoryCache } from './cache';
import { getSquirclePathAsDataUri, iOSPreset } from './path';
import { useObserveResize } from './resize';

export interface SquircleProps {
  className?: string;
  radius?: number | 'auto';
  ratio?: number;
}

export const DEFAULT_RATIO = iOSPreset.r1 / iOSPreset.r2;
const DEFAULT_RADIUS = 15;

interface Size {
  width: number;
  height: number;
}

export function Squircle(
  props: SquircleProps & HTMLAttributes<HTMLDivElement>,
) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  const handleResized = useCallback((entry: ResizeObserverEntry) => {
    const { width, height } = entry.contentRect;

    setSize(oldSize => {
      if (width === oldSize.width && height === oldSize.height) {
        return oldSize;
      }

      return {
        width,
        height,
      };
    });
  }, []);

  useObserveResize(ref, handleResized);

  useLayoutEffect(() => {
    const rect = ref.current?.getBoundingClientRect();

    if (!rect) {
      return;
    }

    const { width, height } = rect;

    setSize({ width, height });
  }, []);

  const { radius, ratio = DEFAULT_RATIO, className, ...htmlProps } = props;

  const width = size.width ?? 0;
  const height = size.height ?? 0;

  return (
    <div
      className={className}
      {...htmlProps}
      ref={ref}
      style={{
        ...props.style,
        ...cachedGetMaskStyle({ width, height, radius, ratio }),
        maskPosition: 'center',
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
      }}
    >
      {props.children}
    </div>
  );
}

interface GetMaskStyleInput {
  width: number;
  height: number;
  radius?: number | 'auto';
  ratio?: number;
}

export function getMaskStyle(input: GetMaskStyleInput): CSSProperties {
  const { width, height } = input;

  const maxBorderRadius = Math.min(width, height) / 2;
  const { radius = maxBorderRadius, ratio = DEFAULT_RATIO } = input;

  const numberRadius = typeof radius === 'string' ? maxBorderRadius : radius;

  const finalBorderRadius = Math.min(numberRadius, maxBorderRadius);

  const dataUri = getSquirclePathAsDataUri(
    width,
    height,
    finalBorderRadius * ratio,
    finalBorderRadius,
  );

  return {
    maskImage: `url("${dataUri}")`,
    maskPosition: 'center',
    maskRepeat: 'no-repeat',
    WebkitMaskImage: `url("${dataUri}")`,
    WebkitMaskPosition: 'center',
    WebkitMaskRepeat: 'no-repeat',
  };
}

const cachedGetMaskStyle = createMemoryCache(getMaskStyle, input => {
  const { width, height, radius, ratio } = input;

  return `${width}-${height}-${radius}-${ratio}`;
});

export interface SuperEllipseImgProps {
  width: number;
  height: number;
  href: string;
  style?: CSSProperties;
  r1?: number;
  r2?: number;
  backgroundColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
}
