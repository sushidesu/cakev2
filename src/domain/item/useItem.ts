import { useCallback, useEffect, useState } from "react"
import { Item } from "./item"
import { ItemId } from "./itemId"
import { ChromeStorageInterface } from "../../domain/item/chromeStorageInterface"
import { formValueToEntity } from "./formValueToEntity"

export interface ItemCollection {
  selectedItemId: ItemId | null
  itemList: Item[]
  create: (props: ItemCreateProps) => void
  update: (props: ItemUpdateProps) => void
  remove: () => void
  duplicate: (id: ItemId) => void
  startCreate: () => void
  select: (id: ItemId) => void
}

export type ItemInfoFormValue = {
  name: string
  price: string
  weight: string
  stockRakuten: string
  stockMakeshop: string
  jancode: string
}

export type ItemCreateProps = {
  itemInfo: ItemInfoFormValue
  blocks: []
}

export type ItemUpdateProps = {
  itemInfo: ItemInfoFormValue
  blocks: []
}

export const useItemCollection = (
  storage: ChromeStorageInterface
): ItemCollection => {
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

  const create = useCallback(
    async ({ itemInfo, blocks }: ItemCreateProps) => {
      const id = ItemId.create()
      const item = formValueToEntity({
        id,
        info: itemInfo,
        blocks,
      })
      await storage.saveItem({
        id,
        item,
      })
      await storage.selectItem({
        id,
      })
      setItems(prev => [...prev, item])
      setSelectedItemId(id)
    },
    [storage]
  )

  const update = useCallback(
    async ({ itemInfo, blocks }: ItemUpdateProps) => {
      if (selectedItemId) {
        console.log("save", itemInfo)
        const item = formValueToEntity({
          id: selectedItemId,
          info: itemInfo,
          blocks,
        })
        await storage.saveItem({ id: selectedItemId, item })
        setItems(prev =>
          prev.map(cur => {
            if (cur.id.equals(selectedItemId)) {
              return item
            } else {
              return cur
            }
          })
        )
      }
    },
    [storage, selectedItemId]
  )

  const remove = useCallback(async () => {
    if (selectedItemId) {
      console.log("remove", selectedItemId)
      await storage.removeItem({ id: selectedItemId })
      setItems(prev => prev.filter(item => !item.id.equals(selectedItemId)))
      setSelectedItemId(null)
    }
  }, [storage, selectedItemId])
  const duplicate = useCallback((id: ItemId) => {
    console.log(id)
    // TODO
  }, [])

  const startCreate = useCallback(async () => {
    await storage.unSelectItem()
    setSelectedItemId(null)
  }, [])

  const select = useCallback(
    async (id: ItemId) => {
      console.log("select", id)
      await storage.selectItem({ id })
      setSelectedItemId(id)
    },
    [storage]
  )

  return {
    selectedItemId,
    itemList: items,
    create,
    update,
    remove,
    duplicate,
    startCreate,
    select,
  }
}
