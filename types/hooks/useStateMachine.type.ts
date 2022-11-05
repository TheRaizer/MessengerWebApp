import { ReactElement } from 'react';

/**
 ** All states in a state machine are given the same type of props.
 ** This is a purposeful restriction, as states should only be placed
 ** together within the same state machine if they share the
 ** properties that they use.
 */

export interface ChangeStateProp<S, T extends ChangeStateProp<S, T>> {
  changeState: (newState: S, props: T) => void;
}

export type State<S, T extends ChangeStateProp<S, T>> = (
  props: T
) => ReactElement;
