class InvalidParamsError extends Error {
  name: string

  constructor (paramName: string) {
    super(`Missing param: ${paramName}`)
    this.name = 'MissingParamsError'
  }
}

export { InvalidParamsError }
