import { defineComponent } from 'vue';
import { AccountEntry } from '../account/AccountEntry';
import { Sidebar } from '../sidebar';
import s from './index.module.sass';
import { getServices } from '~/utils/vue';

export const HomePage = defineComponent({
  name: 'HomePage',
  setup() {
    const services = getServices();
    return () => {
      const { hasLogged } = services.account.self;
      return (
        <div class={s.homepage}>
          <div class={s.main}>
            <div class={s['left-container']}>
              <Sidebar />
            </div>
            {!hasLogged && (
              <div class={s['account-container']}>
                <AccountEntry />
              </div>
            )}
            {hasLogged && (
              <>
                <div class={s['middle-container']}></div>
                <div class={s['right-container']}></div>
              </>
            )}
          </div>
        </div>
      );
    };
  },
});
