import type { FormInstance, FormItemRule } from 'element-plus';
import type { Arrayable } from 'element-plus/es/utils/typescript';
import type { UserAccountInfo } from '../typing';
import { ElButton, ElForm, ElFormItem, ElInput } from 'element-plus';
import { defineComponent, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const USER_NAME: keyof UserAccountInfo = 'username';
const PASSWORD: keyof UserAccountInfo = 'password';

export const LoginForm = defineComponent({
  emits: {
    submit: (userInfo: UserAccountInfo) =>
      userInfo && typeof userInfo === 'object',
  },
  setup(_, ctx) {
    const { t } = useI18n();
    const userInfo = reactive<UserAccountInfo>({
      username: '',
      password: '',
    });
    const { emit } = ctx;
    const rules: Partial<
      Record<keyof UserAccountInfo, Arrayable<FormItemRule>>
    > = {
      username: { required: true, message: t('validate.required') },
      password: [{ required: true, message: t('validate.required') }],
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
              onKeydown={e => {
                (e as KeyboardEvent).key === 'Enter' && onSubmit();
              }}
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
