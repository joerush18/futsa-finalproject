import serviceProvider from "./services/storage/index";
import StorageService from "./services/storage/StorageService";
import { AvailableService, StorageKey } from "./services/storage/types";

export const saveToken = (token: string) => {
  if (!token) {
    return;
  }
  const storage: StorageService = serviceProvider.get(AvailableService.Storage);
  storage.saveItem(StorageKey.JWT, token);
};

export const getToken = () => {
  const storage: StorageService = serviceProvider.get(AvailableService.Storage);
  return storage.getItem<string>(StorageKey.JWT);
};

export const removeToken = () => {
  const storage: StorageService = serviceProvider.get(AvailableService.Storage);
  storage.removeItem(StorageKey.JWT);
};
