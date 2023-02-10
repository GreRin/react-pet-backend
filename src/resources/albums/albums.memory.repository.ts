import {IAlbum, IAlbumDto, Id} from "../../types/index";

const Album = require("../../entity/Album");

const getAll = (userId: any): Promise<IAlbum[]> => {
  const id = (typeof userId === "object") ? userId.userId : userId;
  return Album.find().where({'userId': id});
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
    foto: []
  });

  const savedAlbum = await newAlbum.save();
  return savedAlbum;
};

const updateById = async (id: string, album: IAlbum): Promise<IAlbum> => {
  await Album.updateOne({_id: id}, {title: album.title, updatedAt: album.updatedAt});
  const res = await Album.find().where({'_id': id})
  return res;
};

const updateAlbumById = async (data: any): Promise<IAlbum> => {
  await Album.updateOne({_id: data._id}, {title: data.title, updatedAt: new Date});
  const res = await Album.find().where({'_id': data._id})
  return res[0]._doc;
};

const deleteById = async (id: string): Promise<"DELETED" | "NOT_FOUND"> => {
  const delitionRes = await Album.deleteOne({_id: id});

  if (delitionRes.affected) return "DELETED";
  return "NOT_FOUND";
};

export default { getAll, create, getById, updateById, updateAlbumById, deleteById };
