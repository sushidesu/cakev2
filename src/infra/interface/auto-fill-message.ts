export type AutoFillMessage = {
  fillInfo: boolean
  fillStock: boolean
  fillDescription: boolean
}

export type AutoFillResponse =
  | {
      ok: true
    }
  | {
      ok: false
      message: string
    }
