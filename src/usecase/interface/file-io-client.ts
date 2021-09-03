export interface FileIOClientInterface {
  export(value: Record<string, unknown>): void
  load(file: File): Promise<unknown>
}
