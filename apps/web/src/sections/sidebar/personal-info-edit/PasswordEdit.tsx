import { ElButton, ElInput, ElMessage } from 'element-plus';
import { defineComponent, PropType, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAsyncOperation } from '~/hooks/use-async-operation';
import s from './PasswordEdit.module.sass';

const PasswordEdit = defineComponent({
  name: 'PasswordEdit',
  props: {
    updatePassword: {
      type: Function as PropType<
        (newPassword: string) => Promise<{ success: boolean }>
      >,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const newPassword = ref<string>('');
    const confirmPassword = ref<string>('');
    const { isProcessing: isSubmitting, execute: onSubmit } = useAsyncOperation(
      async () => {
        if (newPassword.value !== confirmPassword.value) {
          ElMessage.error(t('两次输入的密码不一致'));
          return;
        }
        const { success } = await props.updatePassword(newPassword.value);
        if (success) {
          ElMessage.success(t('密码修改成功'));
          newPassword.value = '';
          confirmPassword.value = '';
        }
      },
    );

    return () => (
      <div class={s.passwordEdit}>
        <ElInput
          v-model={newPassword.value}
          type="password"
          showPassword
          autocomplete="off"
          placeholder={t('请输入新密码')}
          class={s.input}
        />
        <ElInput
          v-model={confirmPassword.value}
          type="password"
          showPassword
          autocomplete="off"
          placeholder={t('请确认新密码')}
          class={s.input}
        />
        <ElButton
          type="primary"
          disabled={!newPassword.value || !confirmPassword.value}
          loading={isSubmitting.value}
          onClick={onSubmit}
          class={s.button}
        >
          {t('确认修改')}
        </ElButton>
      </div>
    );
  },
});

export default PasswordEdit;
