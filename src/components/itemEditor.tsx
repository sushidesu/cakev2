import React, { useContext } from "react"
import {
  Container,
  Button,
  Columns
} from "react-bulma-components"
import { ItemStore } from "./itemStore"
import { FormInput, FormDescriptions, FormDetails } from "./formElements"

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

        <Columns>
          <Columns.Column>
            <FormDescriptions value={formValues.descriptions} dispatch={setGlobalState} />
          </Columns.Column>
        </Columns>

        <Columns>
          <Columns.Column>
            <FormDetails value={formValues.details} dispatch={setGlobalState} />
          </Columns.Column>
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
