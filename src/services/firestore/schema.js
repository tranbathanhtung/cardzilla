import { v4 as uuidv4 } from "uuid";
import { firestore } from "../firebase";

export const getSchemaByUserId = async (userId) => {
  try {
    const result = await firestore
      .collection("schemas")
      .where("userId", "==", userId)
      // .orderBy("createdAt", "asc")
      .get();
    if (result.docs.length === 0) return null;
    else return result.docs[0].data();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getSchemaById = async (schemaId) => {
  try {
    const doc = await firestore.collection("schemas").doc(schemaId).get();
    if (doc.exists) {
      return doc.data();
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const createSchema = async (newSchema, user) => {
  try {
    const curDate = new Date();
    const id = uuidv4();
    const result = await firestore
      .collection("schemas")
      .doc(id)
      .set({
        ...newSchema,
        config: JSON.stringify(newSchema.config),
        userId: user.id,
        createdAt: curDate.toISOString(),
        id,
      });
    console.log({ result });
  } catch (error) {
    console.log(error);
  }
};

export const updateSchema = async (newSchema) => {
  try {
    // const id = uuidv4();
    const result = await firestore
      .collection("schemas")
      .doc(newSchema.id)
      .update({
        ...newSchema,
        config: JSON.stringify(newSchema.config),
      });
    console.log({ result });
  } catch (error) {
    console.log(error);
  }
};

export const createOrUpdateSchema = async (newSchema, user) => {
  if (!newSchema.id) {
    // create
    createSchema(newSchema, user);
    return;
  }
  const schema = await getSchemaById(newSchema.id);
  if (!newSchema) {
    // create
    createSchema(newSchema, user);
    return;
  }
  updateSchema(newSchema);
  // update
  return;
};
