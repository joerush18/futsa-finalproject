import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { createUniqueId } from "../../utils/createUniqueId";

const storage = getStorage();

const basePath = "images/";

enum StoragePath {
  User = "user/",
  Futsal = "futsal/",
}

const getUploadPath = (
  storagePath: StoragePath,
  fileName: string = createUniqueId()
) => {
  return basePath + storagePath + fileName;
};

const uploadImage = async (
  imageBase64: string,
  uploadPath: string
): Promise<string> => {
  const imageRef = ref(storage, uploadPath);
  const result = await uploadString(imageRef, imageBase64, "data_url");
  return getDownloadURL(result.ref);
};

export { basePath, StoragePath, storage, uploadImage, getUploadPath };
