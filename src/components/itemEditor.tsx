import React, { useContext, useState, useEffect } from "react"
import styled from "styled-components"
import { Container, Columns, Heading } from "react-bulma-components"
import { ItemStore } from "./itemStore"
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

  const formValues = globalState.formValues
  useEffect(() => {
    setValid(formIsInvalid(formValues))
  }, [formValues])

  return (
    <Container>
      <FormWrapper>
        <Columns>
          <Columns.Column>
            <FormInput
              label={"商品名"}
              field={"name"}
              value={formValues.name}
              dispatch={setGlobalState}
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
                  dispatch={setGlobalState}
                  type={"number"}
                />
              </Columns.Column>
              <Columns.Column size={"half"}>
                <FormInput
                  label={"重さ(g)"}
                  field={"weight"}
                  value={formValues.weight}
                  dispatch={setGlobalState}
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
                  dispatch={setGlobalState}
                  type={"number"}
                />
              </Columns.Column>
              <Columns.Column size={"half"}>
                <FormInput
                  label={"(Makeshop)"}
                  field={"stockMakeshop"}
                  value={formValues.stockMakeshop}
                  dispatch={setGlobalState}
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
              dispatch={setGlobalState}
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
              dispatch={setGlobalState}
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
              dispatch={setGlobalState}
            />
          </Columns.Column>
        </Columns>

        <hr />

        <Columns>
          <Columns.Column>
            <Heading textAlignment={"centered"} subtitle>
              商品詳細
            </Heading>
            <FormDetails value={formValues.details} dispatch={setGlobalState} />
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
