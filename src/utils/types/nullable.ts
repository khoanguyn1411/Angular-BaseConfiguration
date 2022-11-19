/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line functional/prefer-readonly-type
export type Nullable<T extends Record<string, any>> = {
  [K in keyof T]: T[K] | null;
};
