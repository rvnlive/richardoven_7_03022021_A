export function authHeader () {
  // return authorization header with jwt token
  const user = JSON.parse(window.localStorage.getItem('userInformation'))

  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token }
  } else {
    return {}
  }
}
