import { ElDialog, ElTabPane, ElTabs, ElMessage } from 'element-plus';
import { Ref, defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import s from './AccountEntry.module.sass';
import { Login } from './login';
import { Register } from './register';

/** 登录/注册按钮 */
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
          >{`${t('account.login')} / ${t('account.register')}`}</p>
          <ElDialog
            v-model={showAccountPanel.value}
            showClose={false}
            width="400px"
            align-center
            class={s.dialog}
          >
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
