import { defineComponent, getCurrentInstance } from 'vue';
import { UserInfo } from '../typing';
import { LoginForm } from './LoginForm';

export const Login = defineComponent({
  setup() {
    const servives = getCurrentInstance()?.appContext.config.globalProperties;
    const onLogin = async (userInfo: UserInfo) => {
      console.log(userInfo);
    };
    return () => <LoginForm onSubmit={onLogin} />;
  },
});
