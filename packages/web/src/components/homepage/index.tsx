import { defineComponent } from 'vue';
import s from './index.module.sass';
import { AccountButton } from '../account/AccountButton';
import { getServices } from '~/utils/vue';

export const Homepage = defineComponent({
  setup(props, ctx) {
    const services = getServices();
    return () => {
      return (
        <div class={s.homepage}>
          {services.account.loginUser.isReady && <div>登录成功</div>}
          <AccountButton />
        </div>
      );
    };
  },
});
