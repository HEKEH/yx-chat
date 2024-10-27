import { ElDialog } from 'element-plus';
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { getGlobalStore } from '~/utils/vue';
import AvatarEdit from './AvatarEdit';
import s from './index.module.sass';
import UsernameEdit from './UsernameEdit';
import PasswordEdit from './PasswordEdit';

const PersonalInfoEditDialog = defineComponent({
  props: {
    modelValue: Boolean,
  },
  emits: {
    'update:modelValue': (val: boolean) => typeof val === 'boolean',
  },
  name: 'PersonalInfoEditDialog',
  setup(props, { emit }) {
    const { t } = useI18n();
    const onClose = () => {
      emit('update:modelValue', false);
    };
    const globalStore = getGlobalStore();
    const updateAvatar = async (file: File) => {
      return await globalStore.self.updateAvatar(file);
    };
    const updateUsername = async (newUsername: string) => {
      return await globalStore.self.updateUsername(newUsername);
    };
    const updatePassword = async (newPassword: string) => {
      return await globalStore.self.updatePassword(newPassword);
    };
    return () => {
      return (
        <ElDialog
          modelValue={props.modelValue}
          title={t('account.personalSetting')}
          onClose={onClose}
          width="400px"
          align-center
          destroyOnClose
          class={s.dialog}
        >
          <div>
            <div class={s.title}>{t('account.updateAvatar')}</div>
            <AvatarEdit
              url={globalStore.self.avatar}
              updateAvatar={updateAvatar}
            />
          </div>
          <div>
            <div class={s.title}>{t('account.updateUsername')}</div>
            <UsernameEdit
              currentUsername={globalStore.self.name}
              updateUsername={updateUsername}
            />
          </div>
          <div>
            <div class={s.title}>{t('account.updatePassword')}</div>
            <PasswordEdit updatePassword={updatePassword} />
          </div>
        </ElDialog>
      );
    };
  },
});
export default PersonalInfoEditDialog;
