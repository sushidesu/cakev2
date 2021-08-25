import React, { createContext, useCallback, useContext } from "react"
import toast, { Toaster } from "react-hot-toast"

export type ShowAlertProps = {
  message: string
  type: "success" | "error"
}

export type AlertContextProps = {
  showAlert: (props: ShowAlertProps) => void
}

const Context = createContext<AlertContextProps>({
  showAlert: () => {
    console.log("show alert!")
  },
})

export function AlertContextProvider({
  children,
}: {
  children?: React.ReactNode
}): JSX.Element {
  const showAlert = useCallback(({ type, message }: ShowAlertProps) => {
    switch (type) {
      case "success":
        toast.success(message)
        break
      case "error":
        toast.error(message)
        break
    }
  }, [])

  return (
    <Context.Provider value={{ showAlert }}>
      <Toaster />
      {children}
    </Context.Provider>
  )
}

export const useAlertContext: () => AlertContextProps = () =>
  useContext(Context)
