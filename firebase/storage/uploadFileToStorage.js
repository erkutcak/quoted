import { storage, storageRef } from "../firebaseApp";

export async function uploadFileToStorage(file) {
  try {
    const fileName = `${Date.now()}_${file.name}`;
    const fileRef = storageRef(fileName);
    const snapshot = await storage.uploadBytes(fileRef, file);
    const downloadURL = await snapshot.ref.getDownloadURL();

    return downloadURL;
  } catch (error) {
    console.error("Failed to upload file to storage:", error);
    throw error;
  }
}