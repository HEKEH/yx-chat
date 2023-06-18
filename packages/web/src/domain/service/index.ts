import { ServiceContext } from './base/ServiceContext';
import { accountServiceModule } from './Account';

const globalServiceContext: ServiceContext = new ServiceContext();
globalServiceContext.registerModule('account', accountServiceModule);

export default globalServiceContext;
