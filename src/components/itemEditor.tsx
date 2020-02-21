import React, { useContext, useState, useEffect } from "react"
import styled from "styled-components"
import { Container, Columns, Heading } from "react-bulma-components"
import { ItemStore } from "./itemStore"
import { useFormReducer } from "./formState"
import { FormInput, FormImageInput } from "./formSingleInputs"
import { FormDescriptions, FormDetails } from "./formMultipleInputs"
import FormButtons from "./formButtons"
import { formIsInvalid } from "./formValidation"

const FormWrapper = styled.div`
  margin: 0 5px;
`

export default () => {
  const { globalState, setGlobalState } = useContext(ItemStore)
  const [isInvalid, setValid] = useState(false)
  const [formState, dispatchForm] = useFormReducer()

  const formValues = formState.value

  useEffect(() => {
    setValid(formIsInvalid(formValues))
  }, [formValues])

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
              value={formValues.name}
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
                  value={formValues.price}
                  dispatch={dispatchForm}
                  type={"number"}
                />
              </Columns.Column>
              <Columns.Column size={"half"}>
                <FormInput
                  label={"重さ(g)"}
                  field={"weight"}
                  value={formValues.weight}
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
                  value={formValues.stockRakuten}
                  dispatch={dispatchForm}
                  type={"number"}
                />
              </Columns.Column>
              <Columns.Column size={"half"}>
                <FormInput
                  label={"(Makeshop)"}
                  field={"stockMakeshop"}
                  value={formValues.stockMakeshop}
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
              value={formValues.jancode}
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
              value={formValues.imageURL}
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
              value={formValues.descriptions}
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
            <FormDetails value={formValues.details} dispatch={dispatchForm} />
          </Columns.Column>
        </Columns>
      </FormWrapper>

      <FormButtons
        formValues={formValues}
        setGlobalState={setGlobalState}
        isInvalid={isInvalid}
      />
    </Container>
  )
}
