import getData from './crud';
import albumsRepo from '../resources/albums/albums.memory.repository';

export const root = {
  getAllCourses: getData.getAllCourses,
  course: getData.getCourse,
  courses: getData.getCourses,
  createCourse: getData.createCourse,
  updateCourseTopic: getData.updateCourseTopic,
  getAllAlbums: albumsRepo.getAll,
  createAlbum: albumsRepo.create,
  updateAlbum: albumsRepo.updateAlbumById,
  deleteAlbum: albumsRepo.deleteById,
};
