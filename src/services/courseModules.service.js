import axios from './axios.service'

export const add = async (course_module) => {
  if (course_module.title === '' || course_module.title == null) return false
  if (course_module.course_id === '' || course_module.course_id == null) return false

  return (await axios.post('/modules/', course_module)).data
}
export const remove = async (course_module_id) => {
  return (await axios.delete('/modules/' + course_module_id)).data
}
export const getData = async () => {
  const courses = await axios.get('/courses/')
  return { courses }
}
export const getCourseModules = async () => {
  return (await axios.get('/modules/')).data
}
