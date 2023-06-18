import { reactive } from 'vue';
import { ModulesAPI } from '../ModulesAPI';
import { ServiceModule } from './ServiceModule';

export class ServiceContext {
  private _modules: ModulesAPI = {} as ModulesAPI;
  get m() {
    return this._modules;
  }
  static create(): ServiceContext {
    /** 响应式化，以配合vue视图 */
    return reactive(new ServiceContext()) as ServiceContext;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}
  registerModule(name: string, module: ServiceModule) {
    if (name in this._modules) {
      throw new Error(`${name}服务已经被注册过`);
    }
    const m: any = ((this._modules as any)[name] = {});
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
