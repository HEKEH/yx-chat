import { defineComponent } from 'vue';
import { UserInfo } from '../typing';
import { RegisterForm } from './RegisterForm';
import { getServices } from '~/utils/vue';
import { BusinessError } from '~/common/error';

export const Register = defineComponent({
  setup() {
    const services = getServices();
    const onRegister = async (userInfo: UserInfo) => {
      const result = await services.m.account.register(userInfo);
      if (!result.succeed) {
        throw new BusinessError(result.msg);
      }
    };
    return () => <RegisterForm onSubmit={onRegister} />;
  },
});
