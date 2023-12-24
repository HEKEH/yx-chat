import { defineComponent } from 'vue';
import { SearchBar } from './SearchBar';
import { AddContactButton } from './AddContactButton';
import s from './index.module.sass';

export const FunctionBar = defineComponent({
  name: 'FunctionBar',
  setup() {
    return () => {
      return (
        <div class={s['function-bar']}>
          <SearchBar style={{ flex: 1 }} />
          <AddContactButton
            buttonStyle={{ flex: '0 0 auto', 'margin-left': '4px' }}
          />
        </div>
      );
    };
  },
});
