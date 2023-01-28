import type { HttpResponse, HttpRequest } from '../protocols/Http'
import type { Controller } from '../protocols/Controller'
import { MissingParamsError } from '../errors/MissingParamsError'
import { badRequest } from '../helpers/httpHelper'

class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamsError(field))
      }
    }

    return {
      statusCode: 200,
      body: ''
    }
  }
}

export { SignUpController }
