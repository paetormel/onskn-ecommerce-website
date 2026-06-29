export type RenameKey<
  T,
  K extends keyof T,
  NewKey extends string,
> = Omit<T, K> & Record<NewKey, T[K]>;
