import { App, getCurrentInstance, reactive } from 'vue';
import GlobalStore from '~/domain/global-store';

/** register global store when init */
export function registerGlobalStore(app: App) {
  app.config.globalProperties.$globalStore = reactive(new GlobalStore());
}

export function getGlobalStore(): GlobalStore {
  return getCurrentInstance()?.appContext.config.globalProperties.$globalStore;
}
