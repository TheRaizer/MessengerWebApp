import { ReactElement, useCallback, useEffect, useState } from 'react';
import {
  ChangeStateProp,
  StatesDictionary,
} from '../../../types/hooks/useStateMachine.type';

/**
 * Used to manage components that can traverse to and from one another.
 * @param states The states that each component in the state machine can traverse too.
 * @param initialState The starting state/component to initialize the state machine with.
 * @param initialStateProps The props for the starting state/component.
 * @returns The current component/state, as well as a function to change the current state.
 */
export const useStateMachine = <
  S extends keyof T,
  T extends ChangeStateProp<S, T>
>(
  states: StatesDictionary<S, T>,
  initialState: S,
  initialStateProps: T[S]
) => {
  const [initialized, setInitialized] = useState(false);
  const [CurrentComponent, setCurrentComponent] = useState<ReactElement | null>(
    null
  );
  const [currentState, setCurrentState] = useState<S>(initialState);

  /**
   * Changes to a given state that existed in the given states mapping.
   *
   * @param newState the new state to move too (it should exist in the states mapping)
   * @param props the props that will be passed to this state's corrosponding component
   */
  const changeState = useCallback(
    (newState: S, props: T[S] & ChangeStateProp<S, T>) => {
      setCurrentState(newState);
      setCurrentComponent(states[newState](props));
    },
    [states]
  );

  useEffect(() => {
    if (initialized) return;

    const props = { ...initialStateProps, changeState } as T[S] &
      ChangeStateProp<S, T>;
    changeState(initialState, props);

    setInitialized(true);
  }, [changeState, initialState, initialStateProps, initialized]);

  return { CurrentComponent, currentState, changeState };
};
