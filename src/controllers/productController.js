import * as productsService from "../services/productService.js";

const getAll = async (req, res) => {
  try {
    const { category } = req.query;

    if (category) {
      const products = await productsService.getByCategory(category);
      return res.json(products);
    }

    const products = await productsService.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsService.getById(id);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto" });
  }
};

const create = async (req, res) => {
  try {
    const { title, description, category, price, stock } = req.body;

    if (!title || !description || !category || price === undefined || stock === undefined) {
      return res.status(400).json({ error: "Todos los campos son requeridos: title, description, category, price, stock" });
    }

    if (typeof title !== "string" || typeof description !== "string" || typeof category !== "string") {
      return res.status(400).json({ error: "title, description y category deben ser texto" });
    }

    if (typeof price !== "number" || price <= 0) {
      return res.status(400).json({ error: "price debe ser un número mayor a 0" });
    }

    if (Math.round(price * 100) / 100 !== price) {
      return res.status(400).json({ error: "price no puede tener más de 2 decimales" });
    }

    if (!Number.isInteger(stock) || stock < 0) {
      return res.status(400).json({ error: "stock debe ser un número entero mayor o igual a 0" });
    }

    const product = await productsService.create({ title, description, category, price, stock });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el producto" });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ error: "Faltan datos para actualizar" });
    }

    if (data.title !== undefined && typeof data.title !== "string") {
      return res.status(400).json({ error: "title debe ser texto" });
    }

    if (data.description !== undefined && typeof data.description !== "string") {
      return res.status(400).json({ error: "description debe ser texto" });
    }

    if (data.category !== undefined && typeof data.category !== "string") {
      return res.status(400).json({ error: "category debe ser texto" });
    }

    if (data.price !== undefined) {
      if (typeof data.price !== "number" || data.price <= 0) {
        return res.status(400).json({ error: "price debe ser un número mayor a 0" });
      }
      if (Math.round(data.price * 100) / 100 !== data.price) {
        return res.status(400).json({ error: "price no puede tener más de 2 decimales" });
      }
    }

    if (data.stock !== undefined && (!Number.isInteger(data.stock) || data.stock < 0)) {
      return res.status(400).json({ error: "stock debe ser un número entero mayor o igual a 0" });
    }

    const product = await productsService.update(id, data);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await productsService.remove(id);
    res.json({ message: `Producto ${id} eliminado correctamente` });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};

export { getAll, getById, create, update, remove };
