import { ServiceContext } from './base/ServiceContext';
import { accountServiceModule } from './Account';

const globalServiceContext: ServiceContext = ServiceContext.create();
globalServiceContext.registerModule('account', accountServiceModule);

export default globalServiceContext;
