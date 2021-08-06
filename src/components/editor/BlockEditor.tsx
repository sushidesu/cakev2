import React from "react"
import { Columns, Heading } from "react-bulma-components"
import { FormDescriptions, FormDetails } from "../formMultipleInputs"
import { FormImageInput } from "../formSingleInputs"

export type Props = {}

export function BlockEditor(): JSX.Element {
  return (
    <div>
      <Columns>
        <Columns.Column>
          <FormImageInput
            label={"商品画像URL"}
            field={"imageURL"}
            value={""}
            message={""}
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
          <FormDescriptions value={[]} dispatch={() => {}} />
        </Columns.Column>
      </Columns>

      <hr />

      <Columns>
        <Columns.Column>
          <Heading textAlignment={"centered"} subtitle>
            商品詳細
          </Heading>
          <FormDetails value={[]} dispatch={() => {}} />
        </Columns.Column>
      </Columns>
    </div>
  )
}
