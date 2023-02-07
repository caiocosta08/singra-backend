import axios from './axios.service'

export const add = async (course) => {
  if (course.title === '' || course.title == null) return false
  if (course.description === '' || course.description == null) return false
  if (course.time === '' || course.time == null) return false
  if (course.price === '' || course.price == null) return false

  return (await axios.post('/courses/', course)).data
}
export const remove = async (course_id) => {
  return (await axios.delete('/courses/' + course_id)).data
}
export const getCourses = async () => {
  return (await axios.get('/courses/')).data
}
