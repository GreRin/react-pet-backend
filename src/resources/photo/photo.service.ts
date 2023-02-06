import {IPhoto} from "../../types";
import photoMemoryRepository from "./photo.memory.repository";

const getAll = (albumId: string): Promise<IPhoto[]> => photoMemoryRepository.getAll(albumId);

const getById = (id: string): Promise<Partial<IPhoto> | undefined> =>
  photoMemoryRepository.getById(id)

const create = (body: any): Promise<Partial<any> | undefined> =>
  photoMemoryRepository.create(body);

const deleteById = (data: any): Promise<'DELETED' | 'NOT_FOUND'> =>
  photoMemoryRepository.deleteById(data);

export default { getAll, create, getById, deleteById };
