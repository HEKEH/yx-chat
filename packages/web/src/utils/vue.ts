import { App, getCurrentInstance, reactive } from 'vue';
import { GlobalModulesAPI } from '~/domain/service/GlobalModulesAPI';
import { ServiceContext } from '~/domain/service/base/ServiceContext';
import { ModulesAPI } from '~/domain/service/base/types';

/** register services when init */
export function registerServices<T extends ModulesAPI = GlobalModulesAPI>(
  app: App,
  serviceContext: ServiceContext<T>,
) {
  app.config.globalProperties.$services = reactive(serviceContext); // reactive有点多余了，但仍然保留，以防万一
}

/** get services instance when running */
export function getServices<
  T extends ModulesAPI = GlobalModulesAPI,
>(): ServiceContext<T> {
  return getCurrentInstance()?.appContext.config.globalProperties.$services;
}
