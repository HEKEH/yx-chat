import { defineComponent } from 'vue';
import { SearchBar } from './SearchBar';
import s from './index.module.sass';

export const FunctionBar = defineComponent({
  name: 'FunctionBar',
  setup() {
    return () => {
      return (
        <div class={s['function-bar']}>
          <SearchBar style={{ flex: 1 }} />
        </div>
      );
    };
  },
});
