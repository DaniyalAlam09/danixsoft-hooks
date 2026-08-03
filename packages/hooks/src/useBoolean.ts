import { useCallback, useState } from 'react';

interface UseBooleanReturn {
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
}

export function useBoolean(defaultValue = false): UseBooleanReturn {
  const [value, setValue] = useState(!!defaultValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue(x => !x), []);

  return { value, setValue, setTrue, setFalse, toggle };
}
