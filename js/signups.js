import { collection, doc, setDoc, getDocs, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export const createDoc = async function (data) {
  const newDataRef = doc(collection(db, "signups2022"));
  await setDoc(newDataRef, data);

  const docSnap = await getDoc(newDataRef);
  if (docSnap.exists()) return docSnap.data();
};

export const getSignup = async function () {
  const querySnapshot = await getDocs(collection(db, "signups2022"));
  querySnapshot.forEach((doc) => {
    const data = doc.data();

    console.log(data);
    return data;
  });
};
