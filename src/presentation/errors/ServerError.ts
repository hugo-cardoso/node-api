class ServerError extends Error {
  name: string

  constructor () {
    super('Internal server error')
    this.name = 'ServerError'
  }
}

export { ServerError }
