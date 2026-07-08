import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase.js";

const productsCollection = collection(db, "products");

const getAll = async () => {
  const snapshot = await getDocs(productsCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const getById = async (id) => {
  const docRef = doc(db, "products", id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() };
};

const create = async (data) => {
  const docRef = await addDoc(productsCollection, data);
  return { id: docRef.id, ...data };
};

const update = async (id, data) => {
  const docRef = doc(db, "products", id);
  await updateDoc(docRef, data);
  return { id, ...data };
};

const remove = async (id) => {
  const docRef = doc(db, "products", id);
  await deleteDoc(docRef);
  return { id };
};

const getByCategory = async (category) => {
  const q = query(productsCollection, where("category", "==", category));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export { getAll, getById, create, update, remove, getByCategory };
