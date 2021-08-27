import { FileIOClientInterface } from "../usecase/interface/file-io-client"
import { YYYY_MM_DD_HHmmss } from "../plugins/date"

export class FileIOClient implements FileIOClientInterface {
  public async load(file: File): Promise<any> {
    const jsonString = await this.readFile(file)
    return JSON.parse(jsonString)
  }

  private readFile(file: File): Promise<string> {
    const reader = new FileReader()
    reader.readAsText(file)

    return new Promise<string>((resolve) => {
      reader.onload = (ev: ProgressEvent<FileReader>) => {
        if (!ev.target || typeof ev.target.result !== "string") {
          throw Error("不正なファイルです。")
        }
        resolve(ev.target.result)
      }
    })
  }

  public export(json: { [key: string]: any }): void {
    const encoded = encodeURIComponent(JSON.stringify(json))
    const url = `data:text/json;charset=utf-8,${encoded}`

    const date = YYYY_MM_DD_HHmmss()
    const fileName = `item-list-${date}.json`

    chrome.downloads.download({
      url,
      filename: fileName,
    })
  }
}
