/**
 * Makes a single or set of properties on a type required instead of optional.
 * eg.
 * WithRequired<Foo, 'x' | 'y'>
 * makes properties x and y on the type Foo required.
 */
export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
