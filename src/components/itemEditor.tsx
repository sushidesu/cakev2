import React from "react"
import styled from "styled-components"
import { Container, Columns } from "react-bulma-components"
import { FormInput } from "./formSingleInputs"
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
      </FormWrapper>
    </Container>
  )
}

export default ItemEditor
