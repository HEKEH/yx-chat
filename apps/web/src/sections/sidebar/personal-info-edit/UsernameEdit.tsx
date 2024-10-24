import { ElButton, ElInput, ElMessage } from 'element-plus';
import { defineComponent, PropType, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAsyncOperation } from '~/hooks/use-async-operation';
import s from './UsernameEdit.module.sass';

const UsernameEdit = defineComponent({
  name: 'UsernameEdit',
  props: {
    currentUsername: {
      type: String,
      required: true,
    },
    updateUsername: {
      type: Function as PropType<
        (newUsername: string) => Promise<{ success: boolean }>
      >,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const newUsername = ref<string>(props.currentUsername);
    const { isProcessing: isSubmitting, execute: onSubmit } = useAsyncOperation(
      async () => {
        const { success } = await props.updateUsername(newUsername.value);
        if (success) {
          ElMessage.success(t('用户名修改成功'));
        }
      },
    );

    return () => (
      <div class={s.usernameEdit}>
        <ElInput
          v-model={newUsername.value}
          placeholder={t('请输入新的用户名')}
          class={s.input}
        />
        <ElButton
          type="primary"
          disabled={
            !newUsername.value || newUsername.value === props.currentUsername
          }
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

export default UsernameEdit;