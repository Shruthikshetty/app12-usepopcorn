import { SetStateAction, useEffect, useState } from "react";

/**
 * A custom React hook to save and load data to local storage and read it on the first component render.
 * @template T The type of the state value
 * @param initialState The initial state value
 * @param key The key to store the value in local storage
 * @returns A tuple containing the state value and a function to update it
 */
export function useLocalStorageState<T>(
  initialState: T,
  key: string
): [T, React.Dispatch<SetStateAction<T>>] {
  // Initialize state with the value from local storage or the initial state
  const [value, setValue] = useState<T>(() => {
    const storedValue: string = localStorage.getItem(key) as string;
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  // Update local storage whenever the state value changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
