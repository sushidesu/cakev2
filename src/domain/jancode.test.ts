import { Jancode } from "./jancode"

describe(`Jancode`, () => {
  describe(`create()`, () => {
    it(`creates jancode if it's valid`, () => {
      const jancode = Jancode.create("4589949581178")
      expect(jancode.toString()).toBe("4589949581178")
    })
    it(`throws error if it's invalid`, () => {
      expect(() => Jancode.create("hogehoge")).toThrowError()
    })
  })
  describe(`validateLength()`, () => {
    it(`doesn't throw error if length 13`, () => {
      expect(() => Jancode.validateLength("1234567890123")).not.toThrowError()
    })
    it(`throws error if length 14<=`, () => {
      expect(() => Jancode.validateLength("12345678901234")).toThrowError()
    })
    it(`throws error if length <=12`, () => {
      expect(() => Jancode.validateLength("123456789012")).toThrowError()
    })
  })
  describe(`validateHasOnlyDigits()`, () => {
    it(`doesn't throw error if it contains only integers`, () => {
      expect(() => Jancode.validateHasOnlyDigits("012345")).not.toThrowError()
    })
    it(`throws error if it contains anything other than integers`, () => {
      expect(() => Jancode.validateHasOnlyDigits("01234e")).toThrowError()
    })
  })
  describe(`validateCheckDigit()`, () => {
    it(`doesn't throw error if it has valid check digit`, () => {
      expect(() =>
        Jancode.validateCheckDigit("4976404360223")
      ).not.toThrowError()
    })
    it(`doesn't throw error if it has valid check digit (=0)`, () => {
      expect(() =>
        Jancode.validateCheckDigit("4589949580980")
      ).not.toThrowError()
    })
    it(`throws error if it has invalid check digit`, () => {
      expect(() => Jancode.validateCheckDigit("4976404360224")).toThrowError()
    })
  })
})
