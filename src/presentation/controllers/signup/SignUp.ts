import type { HttpResponse, HttpRequest, Controller, EmailValidator, AddAccount } from './signUpProtocols'
import { MissingParamsError, InvalidParamsError } from '../../errors'
import { badRequest, serverError, ok } from '../../helpers/httpHelper'

class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamsError(field))
        }
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamsError('passwordConfirmation'))
      }

      if (!this.emailValidator.isValid(email)) {
        return badRequest(new InvalidParamsError('email'))
      }

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      return ok(account)
    } catch (error) {
      return serverError()
    }
  }
}

export { SignUpController }
