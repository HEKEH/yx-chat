import { BaseService } from './BaseService';
import { ServiceContext } from './ServiceContext';

/**
 * 一个service的模块
 */
export type ServiceModule = {
  repos?: {
    [name: string]: any;
  };
  services: {
    [name: string]: new (context: ServiceContext) => BaseService;
  };
};
