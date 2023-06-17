import {
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  FormInstance,
  FormItemRule,
} from 'element-plus';
import type { Arrayable } from 'element-plus/es/utils/typescript';
import { defineComponent, reactive, ref } from 'vue';
import { UserInfo } from '../typing';

const USER_NAME: keyof UserInfo = 'username';
const PASSWORD: keyof UserInfo = 'password';

export const LoginForm = defineComponent({
  emits: {
    submit: (userInfo: UserInfo) => userInfo && typeof userInfo === 'object',
  },
  setup(_, ctx) {
    const userInfo = reactive<UserInfo>({
      username: '',
      password: '',
    });
    const { emit } = ctx;
    const rules: Partial<Record<keyof UserInfo, Arrayable<FormItemRule>>> = {
      username: { required: true, message: '用户名为必填项' },
      password: [{ required: true, message: '密码为必填项' }],
    };
    const formRef = ref<FormInstance>();
    const onSubmit = async () => {
      try {
        await formRef.value?.validate();
        emit('submit', userInfo);
      } catch (e) {
        console.warn(e);
      }
    };
    return () => {
      return (
        <ElForm model={userInfo} rules={rules} ref={formRef} labelWidth="80px">
          <ElFormItem prop={USER_NAME} label="用户名">
            <ElInput v-model={userInfo.username} />
          </ElFormItem>
          <ElFormItem prop={PASSWORD} label="密码">
            <ElInput
              v-model={userInfo.password}
              type="password"
              showPassword
              autocomplete="off"
            />
          </ElFormItem>
          <ElFormItem>
            <ElButton type="primary" onClick={onSubmit}>
              登录
            </ElButton>
          </ElFormItem>
        </ElForm>
      );
    };
  },
});
