import * as BcryptJS from 'bcryptjs'

const delegatee = BcryptJS

export const compare = (input: string, hashed: string) => {
  return delegatee.compare(input, hashed)
}

export const hash = (input: string, saltRound: number) => {
  return delegatee.hash(input, saltRound)
}
