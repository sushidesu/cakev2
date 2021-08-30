export type Loading<T> =
  | {
      status: "loading"
    }
  | {
      status: "error"
      error: any
    }
  | {
      status: "done"
      value: T
    }
