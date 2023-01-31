import {IAlbum, IAlbumDto, Id} from "../../types/index";

const Album = require("../../entity/Album");

const getAll = async (userId: string): Promise<IAlbum[]> => {
  const res = await Album.find().where({'id': userId})
  return res;
};

const getById = async (id: Id): Promise<Partial<IAlbum> | undefined> => {
  const res = await Album.find().where({'_id': id});
  return res;
};

const create = async (body: IAlbumDto): Promise<Partial<IAlbum>> => {
  const newAlbum = new Album({
    userId: body.userId,
    title: body.title,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const savedAlbum = await newAlbum.save();
  return savedAlbum;
};

// const updateById = async (
//   id: string,
//   fund: IFundDto
// ): Promise<Fund | undefined> => {
//   const fundRepository = await getRepository(Fund);
//   const res: Partial<Fund> | undefined = await getById(id);
//   return res && fundRepository.save({ ...res, ...fund });
// };
//
// const deleteById = async (id: string): Promise<"DELETED" | "NOT_FOUND"> => {
//   const fundsRepository = await getRepository(Fund);
//   const delitionRes = await fundsRepository.delete(id);
//   if (delitionRes.affected) return "DELETED";
//   return "NOT_FOUND";
// };
//
export default { getAll, create, getById };
