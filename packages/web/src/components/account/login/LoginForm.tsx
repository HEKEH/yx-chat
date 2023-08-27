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

const USER_NAME: keyof UserAccountInfo = 'username';
const PASSWORD: keyof UserAccountInfo = 'password';

export const LoginForm = defineComponent({
  emits: {
    submit: (userInfo: UserAccountInfo) => userInfo && typeof userInfo === 'object',
  },
  setup(_, ctx) {
    const userInfo = reactive<UserAccountInfo>({
      username: '',
      password: '',
    });
    const { emit } = ctx;
    const rules: Partial<Record<keyof UserAccountInfo, Arrayable<FormItemRule>>> = {
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
          <ElFormItem>
            <ElButton type="primary" onClick={onSubmit}>
              {t('account.login')}
            </ElButton>
          </ElFormItem>
        </ElForm>
      );
    };
  },
});
