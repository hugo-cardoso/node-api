import { SignUpController } from './SignUp'
import { MissingParamsError } from '../errors/MissingParamsError'
import { InvalidParamsError } from '../errors/InvalidParamsError'
import type { EmailValidator } from '../protocols/EmailValidator'

type SutTypes = {
  sut: SignUpController
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  const emailValidatorStub = new EmailValidatorStub()
  const sut = new SignUpController(emailValidatorStub)

  return {
    sut,
    emailValidatorStub
  }
}

describe('SignUp Controller', () => {
  test('Deve retornar 400 se o nome não for fornecido', () => {
    const { sut } = makeSut()
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
    const { sut } = makeSut()
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
    const { sut } = makeSut()
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
    const { sut } = makeSut()
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

  test('Deve retornar 400 se o email fornecido não for valido', () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const httpRequest = {
      body: {
        name: 'Hugo',
        email: 'invalid_email@teste.com',
        password: 'password',
        passwordConfirmation: 'password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamsError('email'))
  })
})
