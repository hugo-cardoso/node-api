import type { HttpResponse, HttpRequest } from '../protocols/Http'
import { MissingParamsError } from '../errors/MissingParamsError'
import { badRequest } from '../helpers/httpHelper'

class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamsError('name'))
    }

    if (!httpRequest.body.email) {
      return badRequest(new MissingParamsError('email'))
    }

    return {
      statusCode: 200,
      body: ''
    }
  }
}

export { SignUpController }
