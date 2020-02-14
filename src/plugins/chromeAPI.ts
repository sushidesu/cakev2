export const getChromeStorage = () =>
  new Promise<{ [key: string]: any }>(resolve => {
    chrome.storage.local.get(null, items => {
      console.log(items)
      resolve(items)
    })
  })
