import LocalStorageClient from "./LocalStorageClient";
import StorageService from "./StorageService";
import { AvailableService, IServices, Service } from "./types";

const services: IServices = {
  storage: new StorageService(new LocalStorageClient()),
};

class ServiceProvider {
  public get(name: AvailableService) {
    return services[name];
  }

  public swap(name: AvailableService, provider: (all: IServices) => Service) {
    Reflect.set(services, name, provider(services));
  }

  public async init() {
    await services.storage.init();
  }
}

const serviceProvider = new ServiceProvider();

export default serviceProvider;
