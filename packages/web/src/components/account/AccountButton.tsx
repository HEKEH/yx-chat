import { ElButton, ElDialog, ElTabPane, ElTabs } from 'element-plus';
import { Ref, defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import s from './AccountButton.module.sass';
import { Login } from './login';
import { Register } from './register';

/** 登录/注册按钮 */
export const AccountButton = defineComponent({
  setup() {
    const showAccountPanel = ref(false);
    const activeTab: Ref<'login' | 'register'> = ref('login');
    const { t } = useI18n();
    return () => {
      return (
        <>
          <ElButton
            type="primary"
            onClick={() => {
              showAccountPanel.value = true;
            }}
          >
            {`${t('account.login')} / ${t('account.register')}`}
          </ElButton>
          <ElDialog
            v-model={showAccountPanel.value}
            showClose={false}
            width="400px"
            class={s.dialog}
          >
            <ElTabs stretch v-model={activeTab.value}>
              <ElTabPane name="login" label={t('account.login')}>
                <Login
                  onSuccess={() => {
                    showAccountPanel.value = false;
                  }}
                />
              </ElTabPane>
              <ElTabPane name="register" label={t('account.register')}>
                <Register
                  onSuccess={() => {
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
