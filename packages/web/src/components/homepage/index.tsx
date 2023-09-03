import { defineComponent } from 'vue';
import { getGlobalStore } from '~/utils/vue';
import { AccountEntry } from '../account/AccountEntry';
import { Sidebar } from '../sidebar';
import s from './index.module.sass';
import { MiddlePage } from './middle-page';

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
            {hasLogged && (
              <>
                <div class={s['middle-container']}>
                  <MiddlePage />
                </div>
                <div class={s['right-container']}></div>
              </>
            )}
          </div>
        </div>
      );
    };
  },
});
