import { reactive } from 'vue';
import { ServiceContext } from './base/service-context';
import { accountServiceModule } from './account';
import { GlobalServiceModulesAPI } from './global-service-modules-api';

const globalServiceContext = reactive(
  // reactive is necessary, otherwise registerModule below will not work as expected, because the context the modules use should be reactive
  new ServiceContext<GlobalServiceModulesAPI>(),
) as ServiceContext<GlobalServiceModulesAPI>;

globalServiceContext.registerModule('account', accountServiceModule);

export default globalServiceContext;
