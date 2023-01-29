import type { AccountModel } from '../models/Account'

interface AddAccountModel {
  name: string
  email: string
  password: string
}

class AddAccount {
  add (account: AddAccountModel): AccountModel {}
}

export type { AddAccountModel }
export { AddAccount }
