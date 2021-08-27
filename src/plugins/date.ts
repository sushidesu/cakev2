import dayjs from "dayjs"

export const YYYY_MM_DD_HHmmss = (): string =>
  dayjs().format("YYYY-MM-DDTHHmmss")
