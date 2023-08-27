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
import { useI18n } from 'vue-i18n';
import { UserAccountInfo } from '../typing';

interface ResisterUserInfo extends UserAccountInfo {
  confirmPassword: string;
}

const USER_NAME: keyof ResisterUserInfo = 'username';
const PASSWORD: keyof ResisterUserInfo = 'password';
const CONFIRM_PASSWORD: keyof ResisterUserInfo = 'confirmPassword';

export const RegisterForm = defineComponent({
  name: 'RegisterForm',
  emits: {
    submit: (userInfo: UserAccountInfo) => userInfo && typeof userInfo === 'object',
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
    const { t } = useI18n();
    return () => {
      return (
        <ElForm
          model={userInfo}
          rules={rules}
          ref={formRef}
          labelPosition="top"
        >
          <ElFormItem prop={USER_NAME} label={t('account.username')}>
            <ElInput v-model={userInfo.username} />
          </ElFormItem>
          <ElFormItem prop={PASSWORD} label={t('account.password')}>
            <ElInput
              v-model={userInfo.password}
              type="password"
              showPassword
              autocomplete="off"
            />
          </ElFormItem>
          <ElFormItem
            prop={CONFIRM_PASSWORD}
            label={t('account.confirmPassword')}
          >
            <ElInput
              v-model={userInfo.confirmPassword}
              type="password"
              showPassword
              autocomplete="off"
            />
          </ElFormItem>
          <ElFormItem>
            <ElButton type="primary" onClick={onSubmit}>
              {t('account.register')}
            </ElButton>
          </ElFormItem>
        </ElForm>
      );
    };
  },
});
