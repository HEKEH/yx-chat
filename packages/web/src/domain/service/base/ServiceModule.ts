import { BaseService } from './BaseService';
import { ServiceContext } from './ServiceContext';
import { ModulesAPI } from './types';

/**
 * 一个service的模块
 */
export type ServiceModule<T extends ModulesAPI> = {
  repos?: {
    [name: string]: any;
  };
  services: {
    [name: string]: new (context: ServiceContext<T>) => BaseService<T>;
  };
};
