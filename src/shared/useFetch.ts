import { useState, useEffect } from "react"
import { Loading } from "./loading"

export const useFetch = <T>(fetcher: () => Promise<T>): Loading<T> => {
  const [value, setValue] = useState<T>()
  const [error, setError] = useState<unknown>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    let unmounted = false

    const _fetch = async () => {
      try {
        const result = await fetcher()
        if (!unmounted) {
          setLoading(false)
          setValue(result)
        }
      } catch (err) {
        if (!unmounted) {
          setLoading(false)
          setError(err)
        }
      }
    }
    _fetch()

    return () => {
      unmounted = true
    }
  }, [])

  if (loading) {
    return {
      status: "loading",
    }
  } else if (error) {
    return {
      status: "error",
      error: error,
    }
  } else {
    return {
      status: "done",
      value: value as T,
    }
  }
}
