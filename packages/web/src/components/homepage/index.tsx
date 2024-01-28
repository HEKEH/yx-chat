import { defineComponent } from 'vue';
import { getGlobalStore } from '~/utils/vue';
import { AccountEntry } from '../account/AccountEntry';
import { Sidebar } from '../sidebar';
import { MainPanel } from './MainPanel';
import s from './index.module.sass';

export const HomePage = defineComponent({
  name: 'HomePage',
  setup() {
    const globalStore = getGlobalStore();
    return () => {
      const { hasLogged } = globalStore.self;
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
            {hasLogged && <MainPanel />}
          </div>
        </div>
      );
    };
  },
});
