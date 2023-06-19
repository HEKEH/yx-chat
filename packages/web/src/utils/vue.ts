import { App, getCurrentInstance, reactive } from 'vue';
import { GlobalServiceModulesAPI } from '~/domain/service/GlobalServiceModulesAPI';
import { ServiceContext } from '~/domain/service/base/ServiceContext';
import { ServiceModulesAPI } from '~/domain/service/base/types';

/** register services when init */
export function registerServices<
  T extends ServiceModulesAPI = GlobalServiceModulesAPI,
>(app: App, serviceContext: ServiceContext<T>) {
  app.config.globalProperties.$serviceContext = reactive(serviceContext); // reactive is not necessary, but still reserved
}

/** get services instance when running */
export function getServices<
  T extends ServiceModulesAPI = GlobalServiceModulesAPI,
>(): T {
  return getCurrentInstance()?.appContext.config.globalProperties
    .$serviceContext.services;
}
