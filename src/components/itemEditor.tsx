import React, { useContext } from "react"
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
export type FormValue = {
  name: string
  price: string
  weight: string
  stockRakuten: string
  stockMakeshop: string
  jancode: string
}

export type Props = {
  editTargetInfo: FormValue
  handleChange: (
    key: keyof FormValue
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void
}

function ItemEditor({ editTargetInfo, handleChange }: Props): JSX.Element {
  const { setGlobalState } = useContext(ItemStore)
  const [formState, dispatchForm] = useFormReducer()

  const { value, message } = formState

  return (
    <Container>
      <FormWrapper>
        <Columns>
          <Columns.Column>
            <FormInput
              label={"商品名"}
              field={"name"}
              value={editTargetInfo.name}
              message={message.name}
              onChange={handleChange("name")}
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
                  value={editTargetInfo.price}
                  message={message.price}
                  onChange={handleChange("price")}
                  dispatch={dispatchForm}
                  type={"number"}
                />
              </Columns.Column>
              <Columns.Column size={"half"}>
                <FormInput
                  label={"重さ(g)"}
                  field={"weight"}
                  value={editTargetInfo.weight}
                  message={message.weight}
                  onChange={handleChange("weight")}
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
                  value={editTargetInfo.stockRakuten}
                  message={message.stockRakuten}
                  onChange={handleChange("stockRakuten")}
                  dispatch={dispatchForm}
                  type={"number"}
                />
              </Columns.Column>
              <Columns.Column size={"half"}>
                <FormInput
                  label={"(Makeshop)"}
                  field={"stockMakeshop"}
                  value={editTargetInfo.stockMakeshop}
                  message={message.stockMakeshop}
                  onChange={handleChange("stockMakeshop")}
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
              value={editTargetInfo.jancode}
              message={message.jancode}
              onChange={handleChange("jancode")}
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
