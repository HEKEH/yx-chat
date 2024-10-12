import { defineComponent } from 'vue';
import { getGlobalStore } from '~/utils/vue';
import { UserAccountInfo } from '../typing';
import { RegisterForm } from './RegisterForm';

export const Register = defineComponent({
  name: 'RegisterEntry',
  emits: {
    success: () => true,
  },
  setup(_, { emit }) {
    const globalStore = getGlobalStore();
    const onRegister = async (userInfo: UserAccountInfo) => {
      await globalStore.register(userInfo);
      emit('success');
    };
    return () => <RegisterForm onSubmit={onRegister} />;
  },
});
