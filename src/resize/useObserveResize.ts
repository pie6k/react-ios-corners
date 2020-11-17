import { MutableRefObject, useEffect } from 'react';
import { observeElementResize } from './observeResize';

export function useObserveResize(
  ref: MutableRefObject<HTMLElement | null>,
  callback: (entries: ResizeObserverEntry) => void,
) {
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    return observeElementResize(ref.current, entry => {
      if (!ref.current) {
        return;
      }
      callback(entry);
    });
  }, [ref, callback, ref.current]);

  // const elo = useRef<HTMLDivElement>(null);
}
