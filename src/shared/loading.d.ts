export type Loading<T> =
  | {
      status: "loading"
    }
  | {
      status: "error"
      error: unknown
    }
  | {
      status: "done"
      value: T
    }
