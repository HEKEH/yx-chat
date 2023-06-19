import { ServiceContext } from './ServiceContext';
import { ModulesAPI } from './types';

export abstract class BaseService<T extends ModulesAPI = ModulesAPI> {
  private _context: ServiceContext<T>;

  get context() {
    return this._context;
  }
  constructor(context: ServiceContext<T>) {
    this._context = context;
  }
  abstract execute(...args: unknown[]): unknown;
}
