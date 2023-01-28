import { SignUpController } from './SignUp'

describe('SignUp Controller', () => {
  test('Deve retornar 400 se o nome não for fornecido', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: 'hugo@teste.com',
        password: 'password',
        passwordConfirmation: 'password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: name'))
  })

  test('Deve retornar 400 se o email não for fornecido', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: 'Hugo',
        password: 'password',
        passwordConfirmation: 'password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: email'))
  })
})
