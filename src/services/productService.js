import * as productsModel from "../models/productModel.js";

const getAll = async () => {
  return await productsModel.getAll();
};

const getByCategory = async (category) => {
  return await productsModel.getByCategory(category);
};

const getById = async (id) => {
  return await productsModel.getById(id);
};

const create = async (data) => {
  return await productsModel.create(data);
};

const update = async (id, data) => {
  return await productsModel.update(id, data);
};

const remove = async (id) => {
  return await productsModel.remove(id);
};

export { getAll, getById, create, update, remove, getByCategory };
