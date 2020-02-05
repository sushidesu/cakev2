import React, { useContext } from "react"
import {
  Container,
  Form,
  Button,
  Columns
} from "react-bulma-components"
import { IShopItem } from "../shopItem"
import { ItemStore, Action } from "./itemStore"

const FormInput: React.FC<{
  label: string,
  field: keyof IShopItem,
  value: string,
  dispatch: React.Dispatch<Action>
}> = ({ label, field, value, dispatch }) => (
  <Form.Field>
    <Form.Label>{ label }</Form.Label>
    <Form.Input
      name={field}
      value={value}
      onChange={e =>
        dispatch({
          type: "setField",
          field: field,
          value: e.target.value
        })
      }
    />
  </Form.Field>
)

export default () => {
  const { globalState, setGlobalState } = useContext(ItemStore)
  const formValues = globalState.formValues

  return (
    <Container>
        <Columns>
          <Columns.Column>
            <FormInput label={"商品名"} field={"name"} value={formValues.name} dispatch={setGlobalState}  />
          </Columns.Column>
        </Columns>
        
        <Columns>
          <Columns.Column size={"half"}>
            <Columns className={"is-mobile"}>
              <Columns.Column size={"half"}>
                <FormInput label={"値段(税抜)"} field={"price"} value={formValues.price} dispatch={setGlobalState} />
              </Columns.Column>
              <Columns.Column size={"half"}>
                <FormInput label={"重さ"} field={"weight"} value={formValues.weight} dispatch={setGlobalState} />
              </Columns.Column>
            </Columns>
          </Columns.Column>

          <Columns.Column size={"half"}>
            <Columns className={"is-mobile"}>
              <Columns.Column size={"half"}>
                <FormInput label={"在庫数(楽天)"} field={"stockRakuten"} value={formValues.stockRakuten} dispatch={setGlobalState} />
              </Columns.Column>
              <Columns.Column size={"half"}>
                <FormInput label={"在庫数(Makeshop)"} field={"stockMakeshop"} value={formValues.stockMakeshop} dispatch={setGlobalState} />
              </Columns.Column>
            </Columns>
          </Columns.Column>

        </Columns>

        <Columns>
          <Columns.Column size={"half"}>
            <FormInput label={"JANコード"} field={"jancode"} value={formValues.jancode} dispatch={setGlobalState} />
          </Columns.Column>
          <Columns.Column size={"half"} />
        </Columns>

        <Button onClick={() => {
          console.log(formValues)
          setGlobalState({ type: "update", item: formValues })
        }}>{
          formValues.id === null
            ? "追加"
            : "更新"
        }</Button>
        <Button onClick={() => {
          console.log(globalState)
        }}>Store</Button>
    </Container>
  )
}
