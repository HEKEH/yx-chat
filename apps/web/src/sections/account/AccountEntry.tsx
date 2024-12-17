import type { Ref } from 'vue';
import { ElDialog, ElMessage, ElTabPane, ElTabs } from 'element-plus';
import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import s from './AccountEntry.module.sass';
import { Login } from './login';
import { Register } from './register';

/** login/register button */
export const AccountEntry = defineComponent({
  name: 'AccountEntry',
  setup() {
    const showAccountPanel = ref(true);
    const activeTab: Ref<'login' | 'register'> = ref('login');
    const { t } = useI18n();
    return () => {
      return (
        <>
          <p
            onClick={() => {
              showAccountPanel.value = true;
            }}
            class={s['login-text']}
          >
            {`${t('account.login')} / ${t('account.register')}`}
          </p>
          <ElDialog v-model={showAccountPanel.value} width="400px" align-center>
            <ElTabs stretch v-model={activeTab.value}>
              <ElTabPane name="login" label={t('account.login')}>
                <Login
                  onSuccess={() => {
                    ElMessage.success({
                      message: t('account.loginSuccess'),
                      duration: 1000,
                    });
                    showAccountPanel.value = false;
                  }}
                />
              </ElTabPane>
              <ElTabPane name="register" label={t('account.register')}>
                <Register
                  onSuccess={() => {
                    ElMessage.success({
                      message: t('account.registerSuccess'),
                      duration: 1000,
                    });
                    showAccountPanel.value = false;
                  }}
                />
              </ElTabPane>
            </ElTabs>
          </ElDialog>
        </>
      );
    };
  },
});
