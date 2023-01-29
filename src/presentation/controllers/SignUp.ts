import type { HttpResponse, HttpRequest, Controller, EmailValidator } from '../protocols'
import { MissingParamsError, InvalidParamsError } from '../errors'
import { badRequest, serverError } from '../helpers/httpHelper'

class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamsError(field))
        }
      }

      if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) {
        return badRequest(new InvalidParamsError('passwordConfirmation'))
      }

      if (!this.emailValidator.isValid(httpRequest.body.email)) {
        return badRequest(new InvalidParamsError('email'))
      }

      return {
        statusCode: 200,
        body: ''
      }
    } catch (error) {
      return serverError()
    }
  }
}

export { SignUpController }
