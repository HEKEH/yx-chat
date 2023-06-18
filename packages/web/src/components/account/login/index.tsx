import { defineComponent } from 'vue';
import { getServices } from '~/utils/vue';
import { UserInfo } from '../typing';
import { LoginForm } from './LoginForm';

export const Login = defineComponent({
  setup() {
    const services = getServices();

    const onLogin = async (userInfo: UserInfo) => {
      console.log(userInfo);
    };
    return () => <LoginForm onSubmit={onLogin} />;
  },
});
