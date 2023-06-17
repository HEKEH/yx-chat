import { ElButton, ElDialog, ElTabPane, ElTabs } from 'element-plus';
import { Ref, defineComponent, ref } from 'vue';
import { Login } from './login';
import { Register } from './register';
import s from './AccountButton.module.sass';

/** 登录/注册按钮 */
export const AccountButton = defineComponent({
  setup() {
    const showAccountPanel = ref(false);
    const activeTab: Ref<'login' | 'register'> = ref('login');
    return () => {
      return (
        <>
          <ElButton
            type="primary"
            onClick={() => {
              showAccountPanel.value = true;
            }}
          >
            登录/注册
          </ElButton>
          <ElDialog
            v-model={showAccountPanel.value}
            showClose={false}
            width="500px"
            class={s.dialog}
          >
            <ElTabs stretch v-model={activeTab.value}>
              <ElTabPane name="login" label="登录">
                <Login />
              </ElTabPane>
              <ElTabPane name="register" label="注册">
                <Register />
              </ElTabPane>
            </ElTabs>
          </ElDialog>
        </>
      );
    };
  },
});
