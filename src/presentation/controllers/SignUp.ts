import type { HttpResponse, HttpRequest } from '../protocols/Http'
import type { Controller } from '../protocols/Controller'
import type { EmailValidator } from '../protocols/EmailValidator'
import { MissingParamsError } from '../errors/MissingParamsError'
import { InvalidParamsError } from '../errors/InvalidParamsError'
import { ServerError } from '../errors/ServerError'
import { badRequest } from '../helpers/httpHelper'

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

      if (!this.emailValidator.isValid(httpRequest.body.email)) {
        return badRequest(new InvalidParamsError('email'))
      }

      return {
        statusCode: 200,
        body: ''
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError()
      }
    }
  }
}

export { SignUpController }
