import type { ServiceContext } from '~/domain/service/base/ServiceContext';

declare module '@vue' {
  interface ComponentCustomProperties {
    $services: ServiceContext;
  }
}
