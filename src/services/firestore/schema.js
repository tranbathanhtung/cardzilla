import { v4 as uuidv4 } from "uuid";
import { normalizeSchema } from "services/normalizeData";
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
    const schema = {
      ...newSchema,
      config: JSON.stringify(newSchema.config),
      userId: user.id,
      createdAt: curDate.toISOString(),
      id,
    };

    await firestore
      .collection("schemas")
      .doc(id)
      .set(schema);

    return schema;
  } catch (error) {
    console.log(error);
    return newSchema;
  }
};

export const updateSchema = async (newSchema) => {
  try {
    const schema = {
      ...newSchema,
      config: JSON.stringify(newSchema.config),
    };

    await firestore
      .collection("schemas")
      .doc(newSchema.id)
      .update(schema);

    return schema;
  } catch (error) {
    console.log(error);
    return newSchema;
  }
};

export const createOrUpdateSchema = async (newSchema, user) => {
  let schema = null;
  if (!newSchema.id) schema = await createSchema(newSchema, user); 
  else schema = await updateSchema(newSchema);
  
  return normalizeSchema(schema);
};
