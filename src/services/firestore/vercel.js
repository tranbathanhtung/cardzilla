import { v4 as uuidv4 } from "uuid";
import { firestore } from "../firebase";

export const getVercelUserByUserId = async (userId) => {
  try {
    const result = await firestore
      .collection("vercels")
      .where("userId", "==", userId)
      .get();
    if (result.docs.length === 0) return null;
    else return result.docs[0].data();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteVercelUser = async (user) => {
  try {
    await firestore.collection("vercels").doc(user.vercel?.id).delete();

  } catch(error) {
    console.log(error);
  }
}

export const createVercelUser = async (user, token) => {
  if (!user.id) {
    return null;
  }

  try {
    const curDate = new Date();
    const id = uuidv4();
    const newVercel = {
      token,
      userId: user.id,
      createdAt: curDate.toISOString(),
      id,
    };

    await firestore
      .collection("vercels")
      .doc(id)
      .set(newVercel);
    return newVercel;
  } catch (error) {
    console.log(error);
    return null;
  }
  
}
