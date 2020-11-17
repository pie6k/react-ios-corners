export function removeElementFromArray<T>(array: T[], elem: T) {
  const index = array.indexOf(elem);

  if (index === -1) {
    return;
  }

  array.splice(array.indexOf(elem), 1);
}

export interface Type<T> extends Function {
  new (...args: any[]): T;
}
type Callback<T> = (value: T) => void;

const resizeListenersMap = new WeakMap<
  Element,
  Callback<ResizeObserverEntry>[]
>();
const observedElements = new Set<Element>();

let observer: ResizeObserver;

function getObserver() {
  if (observer) {
    return observer;
  }

  const newObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
      const listeners = resizeListenersMap.get(entry.target);

      if (!listeners) {
        continue;
      }

      listeners.forEach(callback => {
        callback(entry);
      });
    }
  });

  observer = newObserver;

  return newObserver;
}

export function observeElementResize(
  element: HTMLElement,
  callback: Callback<ResizeObserverEntry>,
) {
  // This would fail in tests as there is no resize observer in jsdom.
  // We don't 'resize' window in tests, tho.
  if (!ResizeObserver) {
    return;
  }
  const currentObservers = resizeListenersMap.get(element) ?? [];
  currentObservers.push(callback);

  resizeListenersMap.set(element, currentObservers);

  if (!observedElements.has(element)) {
    getObserver().observe(element);
  }

  return function cancel() {
    removeElementFromArray(currentObservers, callback);

    if (currentObservers.length === 0) {
      getObserver().unobserve(element);
      observedElements.delete(element);
    }
  };
}
