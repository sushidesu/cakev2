import { useCallback, useEffect, useState } from "react"
import { Item } from "./item"
import { ItemId } from "./itemId"
import { CustomBlock } from "../block/block"
import { ChromeStorageClient } from "../../infra/chromeStorageClient"

export interface ItemCollection {
  selectedItemId: ItemId | null
  itemList: Item[]
  create: () => void
  update: (props: ItemUpdateProps) => void
  updateBlock: (props: BlockUpdateProps) => void
  remove: (id: ItemId) => void
  duplicate: (id: ItemId) => void
  select: (id: ItemId) => void
}

export type ItemFormValue = {
  name: string
  price: string
  weight: string
  stockRakuten: string
  stockMakeshop: string
  jancode: string
}

export type ItemUpdateProps = {
  id: ItemId
  value: ItemFormValue
}
export type BlockUpdateProps = {
  id: ItemId
  value: CustomBlock[]
}

export const useItemCollection = (): ItemCollection => {
  const storage = new ChromeStorageClient()
  const [selectedItemId, setSelectedItemId] = useState<ItemId | null>(null)
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    let unmounted = false

    const fetcher = async () => {
      const result = await storage.getAllItems()
      const id = await storage.getSelectedItemId()
      console.log({ result, id })
      if (!unmounted) {
        setItems(result)
        setSelectedItemId(id)
      }
    }
    fetcher()

    return () => {
      unmounted = true
    }
  }, [])

  const create = useCallback(() => {
    // TODO
  }, [])
  const update = useCallback(({}: ItemUpdateProps) => {
    // TODO
  }, [])
  const updateBlock = useCallback(({}: BlockUpdateProps) => {
    // TODO
  }, [])
  const remove = useCallback((id: ItemId) => {
    console.log(id)
    // TODO
  }, [])
  const duplicate = useCallback((id: ItemId) => {
    console.log(id)
    // TODO
  }, [])
  const select = useCallback((id: ItemId) => {
    setSelectedItemId(id)
    console.log("select", id)
  }, [])

  return {
    selectedItemId,
    itemList: items,
    create,
    update,
    updateBlock,
    remove,
    duplicate,
    select,
  }
}