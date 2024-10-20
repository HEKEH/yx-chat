import { ElPopconfirm, ElTooltip } from 'element-plus';
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { getGlobalStore } from '~/utils/vue';
import s from './style.module.sass';
import Power from '@/assets/icons/power.svg';

export const LogoutButton = defineComponent({
  name: 'LogoutButton',
  setup() {
    const globalStore = getGlobalStore();
    const { t } = useI18n();
    const logout = () => {
      globalStore.logout();
    };
    return () => {
      if (!globalStore.self.hasLogged) {
        return null;
      }
      return (
        <ElPopconfirm
          title={t('account.logoutConfirm')}
          width={200}
          v-slots={{
            reference: () => (
              <span>
                <ElTooltip
                  effect="dark"
                  content={t('account.logout')}
                  placement="right"
                >
                  <div class={s.button}>
                    <Power />
                  </div>
                </ElTooltip>
              </span>
            ),
          }}
          onConfirm={logout}
        />
      );
    };
  },
});
