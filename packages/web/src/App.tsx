import { CSSProperties, defineComponent, PropType, ref } from 'vue';
import 'element-plus/dist/index.css';
import { HelloWorld } from './components/HelloWorld';
import s from './App.module.sass';
import { fetch } from './infrastructure/socketIO/fetch';
import { Login } from './components/login';

export default defineComponent({
  setup(props, ctx) {
    return () => (
      <>
        <Login />
      </>
    );
  },
});
