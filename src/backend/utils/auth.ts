export const checkPassword = (password: string, hashed_password: string) => {
  return password === hashed_password
}
