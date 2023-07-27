export interface IEntryMeta {
  createdAt?: number;
  createdBy?: {
    id: string;
    name: string;
    email?: string;
  };
  updatedAt?: number;
  updatedBy?: {
    id: string;
    name: string;
    email?: string;
  };
}
