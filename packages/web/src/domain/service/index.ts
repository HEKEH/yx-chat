import { ServiceContext } from './base/ServiceContext';
import { accountServiceModule } from './Account';

const serviceContext: ServiceContext = new ServiceContext();
serviceContext.registerModule('user', accountServiceModule);

export default serviceContext;
