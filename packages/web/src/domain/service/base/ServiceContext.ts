import { ServiceModule } from './ServiceModule';
import { ServiceModuleAPI, ServiceModulesAPI } from './types';
export class ServiceContext<T extends ServiceModulesAPI = ServiceModulesAPI> {
  private _services: T = {} as T;
  get services(): T {
    return this._services;
  }
  registerModule(name: string, module: ServiceModule<T>) {
    if (name in this._services) {
      throw new Error(`${name}服务已经被注册过`);
    }
    const m: ServiceModuleAPI = {};
    (this._services as ServiceModulesAPI)[name] = m;
    Object.entries(module.services).forEach(([serviceName, Service]) => {
      const service = new Service(this);
      m[serviceName] = service.execute.bind(service);
    });
    if (module.repos) {
      Object.entries(module.repos).forEach(([repoName, repo]) => {
        m[repoName] = repo;
      });
    }
  }
}
