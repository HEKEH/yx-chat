import { ModulesAPI } from '../ModulesAPI';
import { ServiceContext } from './ServiceContext';

export abstract class BaseService {
  private _context: ServiceContext;

  get context() {
    return this._context;
  }
  constructor(context: ServiceContext) {
    this._context = context;
  }
  abstract execute(...args: any): any;
}
