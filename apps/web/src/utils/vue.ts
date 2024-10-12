import { InjectionKey, inject, provide, reactive } from 'vue';
import GlobalStore from '~/domain/global-store';

const GlobalStoreKey: InjectionKey<GlobalStore> = Symbol('GlobalStore');

/** register global store when init */
export function provideGlobalStore() {
  const globalStore: GlobalStore = reactive(new GlobalStore()) as GlobalStore;
  provide(GlobalStoreKey, globalStore);
  return globalStore;
}

export function getGlobalStore(): GlobalStore {
  const globalStore = inject(GlobalStoreKey);
  if (!globalStore) {
    throw new Error(
      'GlobalStore is not provided. Please make sure you register it.',
    );
  }
  return globalStore;
}
