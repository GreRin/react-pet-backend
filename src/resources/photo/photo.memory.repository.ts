import {IAlbum, Id, IPhoto} from "../../types/index";

const Album = require("../../entity/Album");
// const photoSchema = require("../../entity/Album");

const getAll = async (albumId: string): Promise<IPhoto[]> => {
  const res = await Album.find().where({'_id': albumId})
  return res;
};

const getById = async (id: Id): Promise<Partial<IAlbum> | undefined> => {
  const res = await Album.find().where({'_id': id});
  return res;
};

const create = async (body: any): Promise<Partial<IPhoto> | undefined> => {
  const res =
    await Album.findOneAndUpdate({ "_id": body.albumId }, { "$push": { foto: {title: body.title, ref: body.ref}}})
  return res;
}

const deleteById = async (id: string): Promise<"DELETED" | "NOT_FOUND"> => {
  const delitionRes = await Album.deleteOne({_id: id});

  if (delitionRes.affected) return "DELETED";
  return "NOT_FOUND";
};

export default { getAll, create, getById, deleteById };
