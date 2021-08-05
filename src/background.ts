import { getAll } from "./plugins/chromeAPI"
import { ItemCollectionRepository } from "./infra/itemCollectionRepository"
// for development
const hotreload = require("crx-hotreload")
// ------------

async function main() {
  const client = new ItemCollectionRepository()
  console.group("--- get all ---")
  const entireStorage = await getAll()
  console.log(entireStorage)
  console.groupEnd()

  console.group("--- migrate ---")
  await client.migrate()
  console.groupEnd()

  console.group("--- get all ---")
  const result = await getAll()
  console.log(result)
  console.groupEnd()
}

main()
