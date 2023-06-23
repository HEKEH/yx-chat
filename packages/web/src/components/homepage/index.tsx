import { defineComponent } from 'vue';
import { AccountButton } from '../account/AccountButton';
import s from './index.module.sass';
import { I18nSelect } from './widgets/I18nSelect';
import { getServices } from '~/utils/vue';

export const Homepage = defineComponent({
  setup(props, ctx) {
    const services = getServices();
    return () => {
      return (
        <div class={s.homepage}>
          {services.account.loginUser.isReady && <div>登录成功</div>}
          <AccountButton />
          <I18nSelect />
        </div>
      );
    };
  },
});
