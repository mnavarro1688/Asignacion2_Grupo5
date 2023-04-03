import { useDebugValue, useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialState: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(initialState);
  useDebugValue(state);

  useEffect(() => {
    const item = localStorage.getItem(key);
    if (item) setState(parse<T>(item));
  }, [key]);

  useEffect(() => {
    if (state && typeof state !== "function") {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]);

  return [state, setState];
}

function parse<T>(obj: string): T {
  try {
    return JSON.parse(obj);
  } catch (e) {
    return obj as unknown as T;
  }
}
