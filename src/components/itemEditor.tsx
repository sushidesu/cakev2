import React, { useContext, useEffect } from "react"
import styled from "styled-components"
import { Container, Columns, Heading } from "react-bulma-components"
import { ItemStore } from "./itemStore"
import { useFormReducer } from "./formState"
import { FormInput, FormImageInput } from "./formSingleInputs"
import { FormDescriptions, FormDetails } from "./formMultipleInputs"
import FormButtons from "./formButtons"

const FormWrapper = styled.div`
  margin: 0 5px;
`

function ItemEditor(): JSX.Element {
  const { globalState, setGlobalState } = useContext(ItemStore)
  const [formState, dispatchForm] = useFormReducer()

  const { value, message } = formState

  useEffect(() => {
    if (globalState.nowItemIndex === null) {
      dispatchForm({ type: "initField" })
    } else {
      const selected = globalState.shopItems[globalState.nowItemIndex]
      dispatchForm({ type: "select", value: selected })
    }
  }, [globalState.nowItemIndex])

  return (
    <Container>
      <FormWrapper>
        <Columns>
          <Columns.Column>
            <FormInput
              label={"商品名"}
              field={"name"}
              value={value.name}
              message={message.name}
              dispatch={dispatchForm}
            />
          </Columns.Column>
        </Columns>

        <Columns>
          <Columns.Column size={"half"}>
            <Columns className={"is-mobile"}>
              <Columns.Column size={"half"}>
                <FormInput
                  label={"値段(税抜き)"}
                  field={"price"}
                  value={value.price}
                  message={message.price}
                  dispatch={dispatchForm}
                  type={"number"}
                />
              </Columns.Column>
              <Columns.Column size={"half"}>
                <FormInput
                  label={"重さ(g)"}
                  field={"weight"}
                  value={value.weight}
                  message={message.weight}
                  dispatch={dispatchForm}
                  type={"number"}
                />
              </Columns.Column>
            </Columns>
          </Columns.Column>

          <Columns.Column size={"half"}>
            <Columns className={"is-mobile"}>
              <Columns.Column size={"half"}>
                <FormInput
                  label={"在庫数(楽天)"}
                  field={"stockRakuten"}
                  value={value.stockRakuten}
                  message={message.stockRakuten}
                  dispatch={dispatchForm}
                  type={"number"}
                />
              </Columns.Column>
              <Columns.Column size={"half"}>
                <FormInput
                  label={"(Makeshop)"}
                  field={"stockMakeshop"}
                  value={value.stockMakeshop}
                  message={message.stockMakeshop}
                  dispatch={dispatchForm}
                  type={"number"}
                />
              </Columns.Column>
            </Columns>
          </Columns.Column>
        </Columns>

        <Columns>
          <Columns.Column size={"half"}>
            <FormInput
              label={"JANコード"}
              field={"jancode"}
              value={value.jancode}
              message={message.jancode}
              dispatch={dispatchForm}
            />
          </Columns.Column>
          <Columns.Column size={"half"} />
        </Columns>

        <hr />

        <Columns>
          <Columns.Column>
            <FormImageInput
              label={"商品画像URL"}
              field={"imageURL"}
              value={value.imageURL}
              message={message.imageURL}
              dispatch={dispatchForm}
            />
          </Columns.Column>
        </Columns>

        <hr />

        <Columns>
          <Columns.Column>
            <Heading textAlignment={"centered"} subtitle>
              商品説明
            </Heading>
            <FormDescriptions
              value={value.descriptions}
              dispatch={dispatchForm}
            />
          </Columns.Column>
        </Columns>

        <hr />

        <Columns>
          <Columns.Column>
            <Heading textAlignment={"centered"} subtitle>
              商品詳細
            </Heading>
            <FormDetails value={value.details} dispatch={dispatchForm} />
          </Columns.Column>
        </Columns>
      </FormWrapper>

      <FormButtons
        formValues={value}
        setGlobalState={setGlobalState}
        disabled={Object.values(message).some(msg => msg !== "")}
      />
    </Container>
  )
}

export default ItemEditor
