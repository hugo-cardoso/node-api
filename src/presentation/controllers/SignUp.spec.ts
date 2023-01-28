import { SignUpController } from './SignUp'
import { MissingParamsError } from '../errors/MissingParamsError'

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
    expect(httpResponse.body).toEqual(new MissingParamsError('name'))
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
    expect(httpResponse.body).toEqual(new MissingParamsError('email'))
  })

  test('Deve retornar 400 se a senha não for fornecida', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: 'Hugo',
        email: 'hugo@teste.com',
        passwordConfirmation: 'password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamsError('password'))
  })

  test('Deve retornar 400 se a confirmação de senha não for fornecida', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: 'Hugo',
        email: 'hugo@teste.com',
        password: 'password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamsError('passwordConfirmation'))
  })
})
