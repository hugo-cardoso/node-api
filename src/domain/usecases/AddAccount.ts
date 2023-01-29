import type { AccountModel } from '../models/Account'

interface AddAccountModel {
  name: string
  email: string
  password: string
}

class AddAccount {
  async add (account: AddAccountModel): Promise<AccountModel> {}
}

export type { AddAccountModel }
export { AddAccount }
