declare module '*.svg' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<any, any, any>;
  export default component;
}
