import Cookies from 'js-cookie'
const TOKEN_KEY = 'token'
export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: 1 })
}

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token !== 'null') return token
  else return false
}
