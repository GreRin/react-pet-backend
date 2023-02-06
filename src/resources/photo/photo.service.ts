import {IPhoto} from "../../types";
import photoMemoryRepository from "./photo.memory.repository";
import albumsRepo from "../albums/albums.memory.repository";

const getAll = (albumId: string): Promise<IPhoto[]> => photoMemoryRepository.getAll(albumId);

const getById = (id: string): Promise<Partial<IPhoto> | undefined> =>
  photoMemoryRepository.getById(id)

const create = (body: any): Promise<Partial<any> | undefined> =>
  photoMemoryRepository.create(body);

const deleteById = (id: string): Promise<'DELETED' | 'NOT_FOUND'> =>
  albumsRepo.deleteById(id);

export default { getAll, create, getById, deleteById };
