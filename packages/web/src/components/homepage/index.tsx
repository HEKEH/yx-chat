import { defineComponent } from 'vue';
import s from './index.module.sass';
import { AccountButton } from '../account/AccountButton';

export const Homepage = defineComponent({
  setup(props, ctx) {
    return () => {
      return (
        <div class={s.homepage}>
          <AccountButton />
        </div>
      );
    };
  },
});
