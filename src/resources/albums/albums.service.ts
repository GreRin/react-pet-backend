import albumsRepo from './albums.memory.repository';
import {IAlbum, IAlbumDto} from "../../types";

const getAll = (userId: string): Promise<IAlbum[]> => albumsRepo.getAll(userId);

const getById = (id: string): Promise<Partial<IAlbum> | undefined> =>
  albumsRepo.getById(id)

const create = (body: IAlbumDto): Promise<Partial<IAlbum>> =>
  albumsRepo.create(body);

const updateById = (id: string, album: IAlbum): Promise<IAlbum> =>
  albumsRepo.updateById(id, album);

const deleteById = (id: string): Promise<'DELETED' | 'NOT_FOUND'> =>
  albumsRepo.deleteById(id);

export default { getAll, create, getById, updateById, deleteById };
