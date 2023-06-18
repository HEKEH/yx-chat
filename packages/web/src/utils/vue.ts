import { App, getCurrentInstance, reactive } from 'vue';
import globalServiceContext from '~/domain/service';
import { ServiceContext } from '~/domain/service/base/ServiceContext';

/** register services when init */
export function registerServices(
  app: App,
  serviceContext = globalServiceContext,
) {
  app.config.globalProperties.$services = reactive(serviceContext);
}

/** get services instance when running */
export function getServices(): ServiceContext {
  return getCurrentInstance()?.appContext.config.globalProperties.$services;
}
