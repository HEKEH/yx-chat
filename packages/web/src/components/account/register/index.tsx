import { defineComponent } from 'vue';
import { UserInfo } from '../typing';
import { RegisterForm } from './RegisterForm';

export const Register = defineComponent({
  setup() {
    const onRegister = async (userInfo: UserInfo) => {
      console.log(userInfo);
    };
    return () => <RegisterForm onSubmit={onRegister} />;
  },
});
