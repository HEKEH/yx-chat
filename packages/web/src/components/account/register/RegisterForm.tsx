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

interface ResisterUserInfo extends UserInfo {
  confirmPassword: string;
}

const USER_NAME: keyof ResisterUserInfo = 'username';
const PASSWORD: keyof ResisterUserInfo = 'password';
const CONFIRM_PASSWORD: keyof ResisterUserInfo = 'confirmPassword';

export const RegisterForm = defineComponent({
  emits: {
    submit: (userInfo: UserInfo) => userInfo && typeof userInfo === 'object',
  },
  setup(_, ctx) {
    const userInfo = reactive<ResisterUserInfo>({
      username: '',
      password: '',
      confirmPassword: '',
    });
    const { emit } = ctx;
    const rules: Partial<
      Record<keyof ResisterUserInfo, Arrayable<FormItemRule>>
    > = {
      username: { required: true, message: '用户名为必填项' },
      password: [
        { required: true, message: '密码为必填项' },
        { min: 6, message: '密码不能少于6位', trigger: 'blur' },
      ],
      confirmPassword: [
        { required: true, message: '确认密码为必填项' },
        {
          trigger: 'blur',
          validator: (_, value, callback) => {
            if (value === userInfo.password) {
              return callback();
            }
            return callback('与输入的密码不一致');
          },
        },
      ],
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
          <ElFormItem prop={CONFIRM_PASSWORD} label="确认密码">
            <ElInput
              v-model={userInfo.confirmPassword}
              type="password"
              showPassword
              autocomplete="off"
            />
          </ElFormItem>
          <ElFormItem>
            <ElButton type="primary" onClick={onSubmit}>
              注册
            </ElButton>
          </ElFormItem>
        </ElForm>
      );
    };
  },
});
