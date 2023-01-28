import type { HttpResponse, HttpRequest } from '../protocols/Http'
import { MissingParamsError } from '../errors/MissingParamsError'
import { badRequest } from '../helpers/httpHelper'

class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password']

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
