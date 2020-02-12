import React, { useContext, useState, useEffect } from "react"
import styled from "styled-components"
import {
  Container,
  Button,
  Columns,
  Heading,
  Level,
} from "react-bulma-components"
import { ItemStore } from "./itemStore"
import { FormInput, FormDescriptions, FormDetails } from "./formElements"
import { formIsInvalid } from "./formValidation"

const FormWrapper = styled.div`
  margin: 0 5px;
`

const StickyButtonsWrapper = styled.div`
  position: sticky;
  bottom: 0;

  .innerShadow {
    box-shadow: inset 0 -5px 5px #efefef;
    border-radius: 4px;
    width: 100%;
    height: 20px;
  }
  .buttons {
    background-color: #fff;
    padding: 20px 0;
  }
  .level {
    width: 100%;
  }
  button {
    margin: 0 15px;
  }
`

const StickyButtons: React.FC = ({ children }) => (
  <StickyButtonsWrapper>
    <div className={"innerShadow"}></div>
    <div className={"buttons"}>
      { children }
    </div>
  </StickyButtonsWrapper>
)

export default () => {
  const { globalState, setGlobalState } = useContext(ItemStore)
  const [ isInvalid, setValid ] = useState(false)
  
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
              dispatch={setGlobalState} />
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
                  type={"number"} />
              </Columns.Column>
              <Columns.Column size={"half"}>
                <FormInput
                  label={"重さ(g)"}
                  field={"weight"}
                  value={formValues.weight}
                  dispatch={setGlobalState}
                  type={"number"} />
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
                  type={"number"} />
              </Columns.Column>
              <Columns.Column size={"half"}>
                <FormInput
                  label={"(Makeshop)"}
                  field={"stockMakeshop"}
                  value={formValues.stockMakeshop}
                  dispatch={setGlobalState}
                  type={"number"} />
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

        <hr />

        <Columns>
          <Columns.Column>
            <Heading textAlignment={"centered"} subtitle>
              商品説明
            </Heading>
            <FormDescriptions value={formValues.descriptions} dispatch={setGlobalState} />
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

      <StickyButtons>
        <Level>
          <Level.Side align="left">
            <Button
              color={formValues.id === null ? "primary" : "info"}
              onClick={() => setGlobalState({ type: "update", item: formValues })}
              disabled={isInvalid}
            >{
              formValues.id === null
                ? "追加"
                : "変更を保存"
            }</Button>
            {formValues.id !== null && <Button
              color={"primary"}
              outlined={true}
              onClick={() => setGlobalState({ type: "duplicate", index: formValues.id })}
            >コピーして追加</Button>}
          </Level.Side>

          <Level.Side align="right">
            {formValues.id !== null && <Button
              color={"danger"}
              outlined={true}
              className="is-right"
              onClick={() => setGlobalState({ type: "delete", index: formValues.id})}
            >削除</Button>}
          </Level.Side>
        </Level>
      </StickyButtons>

    </Container>
  )
}
