import React from "react"
import styled from "styled-components"
import clsx from "clsx"
import { InputFieldForItemInfo as FormInput } from "./molecule/InputFieldForItemInfo"
import { InputError } from "../utils/inputError"
import { Columns } from "./atom/Columns"
import { Column } from "./atom/Column"

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
    <div className={clsx("container")}>
      <FormWrapper>
        <Columns>
          <Column>
            <FormInput
              label={"商品名"}
              field={"name"}
              value={editTargetInfo.name}
              message={formError.name.message}
              onChange={handleChange("name")}
            />
          </Column>
        </Columns>

        <Columns>
          <Column half>
            <Columns mobile>
              <Column half>
                <FormInput
                  label={"値段(税抜き)"}
                  field={"price"}
                  value={editTargetInfo.price}
                  message={formError.price.message}
                  onChange={handleChange("price")}
                  type={"number"}
                />
              </Column>
              <Column half>
                <FormInput
                  label={"重さ(g)"}
                  field={"weight"}
                  value={editTargetInfo.weight}
                  message={formError.weight.message}
                  onChange={handleChange("weight")}
                  type={"number"}
                />
              </Column>
            </Columns>
          </Column>

          <Column half>
            <Columns mobile>
              <Column half>
                <FormInput
                  label={"在庫数(楽天)"}
                  field={"stockRakuten"}
                  value={editTargetInfo.stockRakuten}
                  message={formError.stockRakuten.message}
                  onChange={handleChange("stockRakuten")}
                  type={"number"}
                />
              </Column>
              <Column half>
                <FormInput
                  label={"(Makeshop)"}
                  field={"stockMakeshop"}
                  value={editTargetInfo.stockMakeshop}
                  message={formError.stockMakeshop.message}
                  onChange={handleChange("stockMakeshop")}
                  type={"number"}
                />
              </Column>
            </Columns>
          </Column>
        </Columns>

        <Columns>
          <Column half>
            <FormInput
              label={"JANコード"}
              field={"jancode"}
              value={editTargetInfo.jancode}
              message={formError.jancode.message}
              onChange={handleChange("jancode")}
            />
          </Column>
          <Column half />
        </Columns>
      </FormWrapper>
    </div>
  )
}

export default ItemEditor
