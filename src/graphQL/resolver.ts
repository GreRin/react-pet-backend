import getData from './crud';

export const root = {
  getAllCourses: getData.getAllCourses,
  course: getData.getCourse,
  courses: getData.getCourses,
  updateCourseTopic: getData.updateCourseTopic,
};
