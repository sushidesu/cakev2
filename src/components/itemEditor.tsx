import React from "react"
import styled from "styled-components"
import { Container, Columns, Heading } from "react-bulma-components"
import { useFormReducer } from "./formState"
import { FormInput, FormImageInput } from "./formSingleInputs"
import { FormDescriptions, FormDetails } from "./formMultipleInputs"
import { InputError } from "../utils/inputError"

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
  formError: {
    [key in keyof FormValue]: InputError
  }
  handleChange: (
    key: keyof FormValue
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void
}

function ItemEditor({
  editTargetInfo,
  formError,
  handleChange,
}: Props): JSX.Element {
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
              message={formError.name.message}
              onChange={handleChange("name")}
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
                  message={formError.price.message}
                  onChange={handleChange("price")}
                  type={"number"}
                />
              </Columns.Column>
              <Columns.Column size={"half"}>
                <FormInput
                  label={"重さ(g)"}
                  field={"weight"}
                  value={editTargetInfo.weight}
                  message={formError.weight.message}
                  onChange={handleChange("weight")}
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
                  message={formError.stockRakuten.message}
                  onChange={handleChange("stockRakuten")}
                  type={"number"}
                />
              </Columns.Column>
              <Columns.Column size={"half"}>
                <FormInput
                  label={"(Makeshop)"}
                  field={"stockMakeshop"}
                  value={editTargetInfo.stockMakeshop}
                  message={formError.stockMakeshop.message}
                  onChange={handleChange("stockMakeshop")}
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
              message={formError.jancode.message}
              onChange={handleChange("jancode")}
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
              onChange={() => {}}
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
    </Container>
  )
}

export default ItemEditor
