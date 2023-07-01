import IStorageService from "./StorageService";

export type Nullable<T> = T | null;

export type Undefinedable<T> = Nullable<T> | undefined;

export enum StorageKey {
  JWT = "jwt",
  SHOULD_REFETCH_DASHBOARD = "shouldRefetchDashboard",
}

export enum AvailableService {
  Storage = "storage",
}

export interface Service {
  getName: () => string;
}

export interface IStorageClient {
  saveItem(key: StorageKey, value: Nullable<string>): Promise<boolean>;
  read(): Promise<Record<string, Nullable<string>>>;
  removeItem(key: StorageKey): Promise<void>;
}

export interface IServices extends Record<AvailableService, Service> {
  storage: IStorageService;
}
