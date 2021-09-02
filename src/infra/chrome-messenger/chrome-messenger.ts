export class ChromeMessenger<T, U> {
  async sendMessage(message: T): Promise<U> {
    console.log(message)

    const currentTabId = await this.getCurrentTabId()
    if (currentTabId === undefined) {
      throw Error()
    }

    return this.send(currentTabId, message)
  }

  private send(tabId: number, message: T): Promise<U> {
    return new Promise<U>((resolve) => {
      chrome.tabs.sendMessage<T, U>(tabId, message, (response) => {
        resolve(response)
      })
    })
  }

  private getCurrentTabId(): Promise<number | undefined> {
    return new Promise<number | undefined>((resolve) => {
      chrome.tabs.query(
        { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
        (tabs) => {
          if (tabs.length) {
            resolve(tabs[0].id)
          } else {
            resolve(undefined)
          }
        }
      )
    })
  }

  public addListener(func: (message: T) => U): void
  public addListener(func: (message: T) => Promise<U>): void
  public addListener(func: (message: T) => U | Promise<U>): void {
    chrome.runtime.onMessage.addListener((message: T, _, callback) => {
      const result = func(message)

      if (result instanceof Promise) {
        result.then((value) => {
          callback(value)
        })
      } else {
        callback(result)
      }

      // https://developer.chrome.com/docs/extensions/reference/runtime/
      // > This function becomes invalid when the event listener returns,
      // > unless you return true from the event listener to indicate you
      // > wish to send a response asynchronously
      return true
    })
  }
}
