import 'element-plus/dist/index.css';
import { defineComponent } from 'vue';
import { Homepage } from './components/homepage';

export default defineComponent({
  setup(props, ctx) {
    return () => (
      <>
        <Homepage />
      </>
    );
  },
});
