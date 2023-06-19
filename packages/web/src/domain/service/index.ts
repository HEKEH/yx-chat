import { ServiceContext } from './base/ServiceContext';
import { accountServiceModule } from './Account';
import { reactive } from 'vue';
import { GlobalModulesAPI } from './GlobalModulesAPI';

const globalServiceContext = reactive(
  // reactive is necessary, otherwise registerModule below will not work as expected, because the context the modules use should be reactive
  new ServiceContext<GlobalModulesAPI>(),
) as ServiceContext<GlobalModulesAPI>;

globalServiceContext.registerModule('account', accountServiceModule);

export default globalServiceContext;
