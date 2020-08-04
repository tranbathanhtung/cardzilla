import { firestore } from "../firebase";

export const getUserById = async userId => {

  try {
    const doc = await firestore.collection("users").doc(userId).get();
    if(doc.exists){
      return doc.data();
		} else {
      return null;
		}

  } catch(error) {
    console.log(error);
    return null;
  }
}

export const createUser = async (authUser) => {
  const user = await getUserById(authUser.uid);
  if (user) return user;
  // else {

  // }
}