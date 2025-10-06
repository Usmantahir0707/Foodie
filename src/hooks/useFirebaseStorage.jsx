import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const storage = getStorage();

export default function useFirebaseStorage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

//   upload file
  const uploadFile = async (file, path) => {
    setLoading(true);
    setError(null);

    try {
      const fileRef = ref(storage, path); 
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      return url;
    } catch (err) {
      setError(err);
      console.error("Upload error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  //  del file
  const deleteFile = async (path) => {
    try {
      const fileRef = ref(storage, path);
      await deleteObject(fileRef);
    } catch (err) {
      console.error("Delete error:", err);
      setError(err);
    }
  };

  return { uploadFile, deleteFile, loading, error };
}
  