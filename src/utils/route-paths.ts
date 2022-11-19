/* eslint-disable functional/prefer-readonly-type */
type ConcatPathsPropType<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K] extends Record<string, unknown>
  ? ConcatPathsPropType<T[K]>
  : T[K] extends string
  ? T[K]
  : never
};

/** Common route paths can be used throughout the project. */
export const commonRoutePaths = {
  root: '/',
  auth: {
    ...composeRootPaths('auth'),
  },
};

/** Common route paths type. */
export type CommonRoutePaths = typeof commonRoutePaths;

/**
 * Concat base path with nested module paths to one route paths object.
 * @param basePath Base path.
 * @param nestedModulePaths Nested module paths to concat with base.
 * @example
 * ```ts
 * const authLocalPaths = {
 *   login: 'login',
 *   forgotPassword: 'forgot-password',
 * };
 *
 * const routePaths = {
 *   auth: {
 *     ...concatPaths('/auth', authLocalPaths),
 *   },
 * };
 * ```
 */
export function concatPaths<T extends Record<string, unknown>>(basePath: string, nestedModulePaths: ConcatPathsPropType<T>): T {
  const paths = Object
    .keys(nestedModulePaths)
    .reduce((acc, key) => {
      acc[key] = typeof nestedModulePaths[key] === 'object' ?
        concatPaths(basePath, nestedModulePaths[key] as ConcatPathsPropType<T>) :
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `${basePath}/${nestedModulePaths[key]}`;
      return acc;
    }, {} as Record<string, unknown>);
  return paths as T;
}

interface RootPaths {

  /** Path for the routing. */
  readonly routingPath: string;

  /** Absolute root path. */
  readonly root: string;
}

/**
 * Compose both path for the routing and absolute root path.
 * @param basePath Base path.
 */
export function composeRootPaths(basePath: string): RootPaths {
  return {
    routingPath: basePath,
    root: `/${basePath}`,
  };
}
