import { DefaultModulesAPI } from "../DefaultModulesAPI";
import { ServiceContext } from "./ServiceContext";

export abstract class BaseService<ModulesAPI extends {
    [name: string]: Function | Object,
} = DefaultModulesAPI> {
    private _context: ServiceContext<ModulesAPI>;

    get context() {
        return this._context;
    }
    constructor(context: ServiceContext<ModulesAPI>) {
        this._context = context
    }
    abstract execute(...args: any): any;
}
