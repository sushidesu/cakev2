export type EntityHookProps<ReconstructProps> =
  | {
      type: "create"
    }
  | {
      type: "reconstruct"
      payload: ReconstructProps
    }
