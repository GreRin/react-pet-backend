import albumsRepo from './albums.memory.repository';
import {IAlbum, IAlbumDto} from "../../types";

const getAll = (userId: string): Promise<IAlbum[]> => albumsRepo.getAll(userId);

const getById = (id: string): Promise<Partial<IAlbum> | undefined> =>
  albumsRepo.getById(id)

const create = (body: IAlbumDto): Promise<Partial<IAlbum>> =>
  albumsRepo.create(body);

// const updateById = async (id: string, fund: IFundDto): Promise<Partial<Fund>> =>
//   Fund.toResponse(await fundRepo.updateById(id, fund)) as Fund;
//
// const deleteById = (id: string): Promise<'DELETED' | 'NOT_FOUND'> =>
//   fundRepo.deleteById(id);
//
export default { getAll, create, getById };
