import { ReactElement } from 'react';

export interface ChangeStateProp<
  S extends keyof T,
  T extends ChangeStateProp<S, T>
> {
  changeState: (newState: S, props: T[S] & ChangeStateProp<S, T>) => void;
}

/**
 * The type representing a state's function wrapped component. This function
 * recieves the type of the props given to the component are defined by,
 * the key of another generic type mapping T in union with a changeState function
 * defined in the @type {ChangeStateProp} type.
 *
 * - K is often an enum literal.
 * - S is often an enum type.
 * - T is often a generic type mapping using the enum S as keys to specific component prop types.
 */
export type State<
  K extends keyof T,
  S extends keyof T,
  T extends ChangeStateProp<S, T>
> = (props: T[K] & ChangeStateProp<S, T>) => ReactElement;

/**
 * The type of an object that will hold the mappings from a state's identifier (usually an enum),
 * to a state's Component function.
 */
export type StatesDictionary<
  S extends keyof T,
  T extends ChangeStateProp<S, T>
> = {
  [key in S]: State<key, S, T>;
};
