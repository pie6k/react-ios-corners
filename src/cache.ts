export function createMemoryCache<T, Args extends any[]>(
  getter: (...args: Args) => T,
  argsSerializer: (...input: Args) => string,
) {
  const cacheMap = new Map<string, T>();

  return function getWithCache(...args: Args) {
    const serializedArgs = argsSerializer(...args);

    const cachedValue = cacheMap.get(serializedArgs);

    if (cachedValue) {
      return cachedValue;
    }

    const newValue = getter(...args);

    cacheMap.set(serializedArgs, newValue);

    return newValue;
  };
}
