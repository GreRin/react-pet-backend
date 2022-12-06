import getData from './crud';

export const root = {
  course: getData.getCourse,
  courses: getData.getCourses,
  updateCourseTopic: getData.updateCourseTopic,
};
