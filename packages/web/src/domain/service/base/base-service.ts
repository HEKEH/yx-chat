import { ServiceContext } from './service-context';
import { ServiceModulesAPI } from './types';

export abstract class BaseService<
  T extends ServiceModulesAPI = ServiceModulesAPI,
> {
  private _context: ServiceContext<T>;

  get context() {
    return this._context;
  }
  get services() {
    return this._context.services;
  }
  constructor(context: ServiceContext<T>) {
    this._context = context;
  }
  abstract execute(...args: unknown[]): unknown;
}
