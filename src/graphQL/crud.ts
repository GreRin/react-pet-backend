import { coursesData } from './index';

const getCourse = function (args: any) {
  const { id } = args;
  return coursesData.filter((course) => course.id === id)[0];
};

const getCourses = function (args: any) {
  if (args.topic) {
    const { topic } = args;
    return coursesData.filter((course) => course.topic === topic);
  }
  return coursesData;
};

const updateCourseTopic = function ({ id, topic }: any) {
  coursesData.map((course) => {
    if (course.id !== id) {
      return null;
    }
    course.topic = topic;
    return course;
  });
  return coursesData.filter((course) => course.id === id)[0];
};

export default { getCourse, getCourses, updateCourseTopic };
