import { defineComponent } from 'vue';
import { UserInfo } from '../typing';
import { RegisterForm } from './RegisterForm';
import { getServices } from '~/utils/vue';

export const Register = defineComponent({
  emits: {
    success: () => true,
  },
  setup(_, { emit }) {
    const services = getServices();
    const onRegister = async (userInfo: UserInfo) => {
      await services.account.register(userInfo);
      emit('success');
    };
    return () => <RegisterForm onSubmit={onRegister} />;
  },
});
