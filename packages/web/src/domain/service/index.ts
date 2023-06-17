import { ServiceContext } from './base/ServiceContext';
import { DefaultModulesAPI } from './DefaultModulesAPI';
import { userServiceModule } from './User';

const serviceContext: ServiceContext<DefaultModulesAPI> = new ServiceContext();
serviceContext.registerModule('user', userServiceModule);

export default serviceContext;
