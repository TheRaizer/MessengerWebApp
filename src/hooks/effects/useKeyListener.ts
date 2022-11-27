import { useEffect } from 'react';
import { Key } from 'ts-key-enum';

/**
 * Listens to the keyup event of a given key, and fires a given function when the event is fired.
 * @param eventOnKeyUp a function to execute when the given key is released.
 * @param key the key to listen for.
 */
export const useKeyListener = (eventOnKeyUp: () => void, key: Key) => {
  useEffect(() => {
    const handleKeyPress = (ev: KeyboardEvent) => {
      if (ev.key === key) {
        eventOnKeyUp();
      }
    };
    document.addEventListener('keyup', handleKeyPress);

    return () => {
      document.removeEventListener('keyup', handleKeyPress);
    };
  }, [eventOnKeyUp, key]);
};
