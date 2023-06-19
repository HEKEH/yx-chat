import { ServiceModule } from './ServiceModule';
import { ModuleAPI, ModulesAPI } from './types';
export class ServiceContext<T extends ModulesAPI = ModulesAPI> {
  private _modules: T = {} as T;
  get m(): T {
    return this._modules;
  }
  registerModule(name: string, module: ServiceModule<T>) {
    if (name in this._modules) {
      throw new Error(`${name}服务已经被注册过`);
    }
    const m: ModuleAPI = {};
    (this._modules as ModulesAPI)[name] = m;
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
