import axios from './axios.service'

export const add = async (lesson) => {
  if (lesson.title === '' || lesson.title == null) return false
  if (lesson.video_url === '' || lesson.video_url == null) return false
  if (lesson.course_id === '' || lesson.course_id == null) return false
  if (lesson.module_id === '' || lesson.module_id == null) return false

  return (await axios.post('/lessons/', lesson)).data
}
export const remove = async (lesson_id) => {
  return (await axios.delete('/lessons/' + lesson_id)).data
}
export const getData = async () => {
  const courses = await axios.get('/courses/')
  const courseModules = await axios.get('/modules/')
  return { courses, courseModules }
}
export const getLessons = async () => {
  return (await axios.get('/lessons/')).data
}
