declare module '*.svg' {
  import type { DefineComponent } from 'vue';

  const component: DefineComponent<any, any, any>;
  export default component;
}
