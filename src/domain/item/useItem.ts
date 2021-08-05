import { useCallback, useEffect, useMemo, useState } from "react"
import { Item, copyItem, updateItem } from "./item"
import { ItemId } from "./itemId"
import { IItemCollectionRepository } from "./interface/itemCollectionRepository"
import { CreateNameOfCopyItem } from "./service/createNameOfCopyItem"
import { ItemFactory } from "./service/itemFactory"

export interface ItemCollection {
  selectedItemId: ItemId | null
  itemList: Item[]
  create: (props: ItemCreateProps) => void
  update: (props: ItemUpdateProps) => void
  remove: () => void
  duplicate: () => void
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
  storage: IItemCollectionRepository,
  itemFactory: ItemFactory
): ItemCollection => {
  const [selectedItemId, setSelectedItemId] = useState<ItemId | null>(null)
  const [items, setItems] = useState<Item[]>([])

  const target = useMemo<Item | undefined>(() => {
    if (!selectedItemId) return undefined
    return items.find(item => item.id.equals(selectedItemId))
  }, [selectedItemId, items])

  useEffect(() => {
    let unmounted = false

    const fetcher = async () => {
      const [result, id] = await Promise.all([
        storage.getAllItems(),
        storage.getSelectedItemId(),
      ])
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
      const item = await itemFactory.create({ itemInfo, blocks })
      const id = item.id

      await Promise.all([
        storage.saveItem({
          id,
          item,
        }),
        storage.selectItem({
          id,
        }),
      ])
      setItems(prev => [...prev, item])
      setSelectedItemId(id)
    },
    [storage]
  )

  const update = useCallback(
    async ({ itemInfo, blocks }: ItemUpdateProps) => {
      if (!target) return

      const item = updateItem({
        target,
        itemInfo,
        blocks,
      })
      await storage.saveItem({ id: item.id, item })
      setItems(prev =>
        prev.map(cur => {
          if (cur.id.equals(item.id)) {
            return item
          } else {
            return cur
          }
        })
      )
    },
    [storage, target]
  )

  const remove = useCallback(async () => {
    if (selectedItemId) {
      console.log("remove", selectedItemId)
      await storage.removeItem({ id: selectedItemId })
      setItems(prev => prev.filter(item => !item.id.equals(selectedItemId)))
      setSelectedItemId(null)
    }
  }, [storage, selectedItemId])

  const duplicate = useCallback(async () => {
    if (!selectedItemId) return

    console.log("duplicate", selectedItemId)
    const target = items.find(item => item.id.equals(selectedItemId))
    if (!target) throw Error(`${selectedItemId.value} not found`)

    const createNameOfCopyItem = new CreateNameOfCopyItem(items)
    const duplicated = copyItem({ target, createNameOfCopyItem })
    const newId = duplicated.id

    await Promise.all([storage.saveItem({ id: newId, item: duplicated })])
    setItems(prev => [...prev, duplicated])
  }, [storage, selectedItemId, items])

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
