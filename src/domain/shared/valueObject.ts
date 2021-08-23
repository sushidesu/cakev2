export interface ValueObject<T extends string, U extends string> {
  _brand: U
  value: T
  equals: (object: ValueObject<T, U>) => boolean
}
