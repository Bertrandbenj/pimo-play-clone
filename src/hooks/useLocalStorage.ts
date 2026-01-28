import { useState, useEffect, useCallback } from 'react';

const DEFAULT_YAML = `version: "1"
seed: 42
masking:
  - selector:
      jsonpath: "name"
    mask:
      randomChoiceInUri: "pimo://nameFR"
`;

export function useLocalStorage(key: string, initialValue?: string) {
  const [storedValue, setStoredValue] = useState<string>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? item : (initialValue ?? DEFAULT_YAML);
    } catch (error) {
      console.error('Error reading localStorage:', error);
      return initialValue ?? DEFAULT_YAML;
    }
  });

  const [lastSaved, setLastSaved] = useState<Date | null>(() => {
    const timestamp = window.localStorage.getItem(`${key}-timestamp`);
    return timestamp ? new Date(timestamp) : null;
  });

  const setValue = useCallback((value: string) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, value);
      const now = new Date();
      window.localStorage.setItem(`${key}-timestamp`, now.toISOString());
      setLastSaved(now);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [key]);

  const clearValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      window.localStorage.removeItem(`${key}-timestamp`);
      setStoredValue(DEFAULT_YAML);
      setLastSaved(null);
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }, [key]);

  return { storedValue, setValue, clearValue, lastSaved, DEFAULT_YAML };
}
