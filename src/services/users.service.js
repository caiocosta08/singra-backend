import axios from './axios.service'

export const add = async (user) => {
  if (user.name === '' || user.name == null) return false
  if (user.last_name === '' || user.last_name == null) return false
  if (user.email === '' || user.email == null) return false
  if (user.password === '' || user.password == null) return false

  return (await axios.post('/users/', user)).data
}
export const remove = async (user_id) => {
  return (await axios.delete('/users/' + user_id)).data
}
export const getUsers = async () => {
  return (await axios.get('/users/')).data
}
