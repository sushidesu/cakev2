export interface FileIOClientInterface {
  export(value: any): void
  load(file: File): Promise<any>
}
