export class Jancode {
  private constructor(private readonly value: string) {}

  public static create(value: string): Jancode {
    this.validate(value)
    return new Jancode(value)
  }
  public static reconstruct(value: string): Jancode {
    // not validated as it reconstructs from repository or tests
    return new Jancode(value)
  }

  public static validate(value: string): void {
    this.validateLength(value)
    this.validateHasOnlyDigits(value)
    this.validateCheckDigit(value)
  }
  public static validateLength(value: string): void {
    // length must be 13
    if (value.length !== 13) {
      throw Error("length must be 13")
    }
  }
  public static validateHasOnlyDigits(value: string): void {
    // must be a string containing only integers
    if (!/^[0-9]+$/.test(value)) {
      throw Error("must be a string containing only integers")
    }
  }
  public static validateCheckDigit(value: string): void {
    // validate check digit with Modulus 10, Weight 3:1
    const length = value.length
    const numbers = value.split("").map(n => parseInt(n))
    const body = numbers.slice(0, length - 1)

    const checkDigit = numbers[length - 1]
    const odd = body.filter((_, i) => i % 2 === 0)
    const even = body.filter((_, i) => i % 2 !== 0).map(n => n * 3)

    const summary = odd.concat(even).reduce((prev, cur) => prev + cur, 0)
    const calculatedCheckDigit = summary % 10 ? 10 - (summary % 10) : 0

    if (checkDigit !== calculatedCheckDigit) {
      throw Error("invalid checkdegit")
    }
  }

  public toString(): string {
    return this.value
  }
}
