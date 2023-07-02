import { Power } from '@icon-park/vue-next';
import { ElPopconfirm } from 'element-plus';
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { getServices } from '~/utils/vue';

export const LogoutButton = defineComponent({
  setup(_, { attrs }) {
    const services = getServices();
    const { account } = services;
    const { t } = useI18n();
    const logout = () => account.logout();
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
              <Power theme="outline" class={attrs.class} strokeWidth={3} />
            ),
          }}
          onConfirm={logout}
        ></ElPopconfirm>
      );
    };
  },
});
