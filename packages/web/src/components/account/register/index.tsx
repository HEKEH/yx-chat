import { defineComponent } from 'vue';
import { UserInfo } from '../typing';
import { RegisterForm } from './RegisterForm';
import { getGlobalStore } from '~/utils/vue';

export const Register = defineComponent({
  name: 'RegisterEntry',
  emits: {
    success: () => true,
  },
  setup(_, { emit }) {
    const globalStore = getGlobalStore();
    const onRegister = async (userInfo: UserInfo) => {
      await globalStore.register(userInfo);
      emit('success');
    };
    return () => <RegisterForm onSubmit={onRegister} />;
  },
});
