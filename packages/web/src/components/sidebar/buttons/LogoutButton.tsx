import { Power } from '@icon-park/vue-next';
import { ElPopconfirm, ElTooltip } from 'element-plus';
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import s from './style.module.sass';
import { getServices } from '~/utils/vue';

export const LogoutButton = defineComponent({
  name: 'LogoutButton',
  setup() {
    const services = getServices();
    const { account } = services;
    const { t } = useI18n();
    const logout = () => {
      account.logout();
    };
    return () => {
      if (!account.self.hasLogged) {
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
                  <Power theme="outline" class={s.button} strokeWidth={3} />
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
