import { getAll } from "./plugins/chromeAPI"
import { ItemCollectionRepository } from "./infra/itemCollectionRepository"
import { ChromeStorageClient } from "./infra/chromeStorageClient"
// for development
const hotreload = require("crx-hotreload")
// ------------

async function main() {
  const client = new ChromeStorageClient()
  const repository = new ItemCollectionRepository(client)

  console.group("--- get all ---")
  const entireStorage = await getAll()
  console.log(entireStorage)
  console.groupEnd()

  console.group("--- migrate ---")
  await repository.migrate()
  console.groupEnd()

  console.group("--- get all ---")
  const result = await getAll()
  console.log(result)
  console.groupEnd()
}

main()
