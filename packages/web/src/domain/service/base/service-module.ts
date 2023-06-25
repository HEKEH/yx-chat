import { BaseService } from './base-service';
import { ServiceContext } from './service-context';
import { ServiceModulesAPI } from './types';

/**
 * 一个service的模块
 */
export type ServiceModule<T extends ServiceModulesAPI> = {
  repos?: {
    [name: string]: any;
  };
  services: {
    [name: string]: new (context: ServiceContext<T>) => BaseService<T>;
  };
};
