import React, { createContext, useCallback, useContext, useState } from "react"
import { AlertMessage } from "./AlertMessage"

export type AlertContextProps = {
  showAlert: (message: string) => void
}

const Context = createContext<AlertContextProps>({
  showAlert: () => {
    console.log("show alert!")
  },
})

type AlertHandler =
  | {
      show: false
    }
  | {
      show: true
      message: string
    }

export function AlertContextProvider({
  children,
}: {
  children?: React.ReactNode
}): JSX.Element {
  const [alert, setAlert] = useState<AlertHandler>({
    show: false,
  })

  const showAlert = useCallback((message: string) => {
    setAlert({
      show: true,
      message: message,
    })
  }, [])

  const removeAlert = useCallback(() => {
    setAlert({
      show: false,
    })
  }, [])

  return (
    <Context.Provider value={{ showAlert }}>
      {children}
      <div>
        {alert.show ? (
          <AlertMessage
            type="info"
            message={alert.message}
            onClickRemove={removeAlert}
          />
        ) : null}
      </div>
    </Context.Provider>
  )
}

export const useAlertContext: () => AlertContextProps = () =>
  useContext(Context)
