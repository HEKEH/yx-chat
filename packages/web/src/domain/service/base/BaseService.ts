import { ServiceContext } from './ServiceContext';
import { ServiceModulesAPI } from './types';

export abstract class BaseService<T extends ServiceModulesAPI = ServiceModulesAPI> {
  private _context: ServiceContext<T>;

  get context() {
    return this._context;
  }
  constructor(context: ServiceContext<T>) {
    this._context = context;
  }
  abstract execute(...args: unknown[]): unknown;
}
