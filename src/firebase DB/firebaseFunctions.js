import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./config";



export const saveItemToFirestore = async (itemData) => {
    try {
      const docRef = await addDoc(collection(db, "items"), itemData);
      console.log("Document written with ID: ", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error;
    }
  };
  
  // Function to upload an image to Firebase Storage
  export const uploadImageToStorage = async (file) => {
    const storageRef = ref(storage, `images/${file.name}`);
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log("Image uploaded at: ", downloadURL);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image: ", error);
      throw error;
    }
  };