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
