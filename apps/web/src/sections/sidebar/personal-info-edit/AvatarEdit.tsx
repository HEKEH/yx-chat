// Start Generation Here
import { ElButton } from 'element-plus';
import { defineComponent, PropType, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Avatar } from '~/components/avatar';
import { useAsyncOperation } from '~/hooks/use-async-operation';
import s from './AvatarEdit.module.sass';
import Camera from '@/assets/icons/camera.svg';

const AvatarEdit = defineComponent({
  name: 'AvatarEdit',
  props: {
    url: {
      type: String,
      required: true,
    },
    updateAvatar: {
      type: Function as PropType<(file: File) => Promise<{ success: boolean }>>,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const newAvatar = ref<string | null>(null);
    const currentFile = ref<File | null>(null);
    const onCancel = () => {
      newAvatar.value = null;
      currentFile.value = null;
    };
    const { isProcessing: isSubmitting, execute: onSubmit } = useAsyncOperation(
      async () => {
        if (currentFile.value) {
          const { success } = await props.updateAvatar(currentFile.value);
          if (success) {
            onCancel();
          }
        }
      },
    );
    const onAvatarChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        const reader = new FileReader();
        reader.onload = e => {
          if (e.target) {
            newAvatar.value = e.target.result as string;
            currentFile.value = file;
          }
        };
        reader.readAsDataURL(file);
      }
    };
    return () => {
      const { url } = props;
      return (
        <div class={s['avatar-edit-box']}>
          {newAvatar.value ? (
            <>
              <img class={s['editing-avatar']} src={newAvatar.value} />
              <div class={s.actions}>
                <ElButton
                  loading={isSubmitting.value}
                  type="primary"
                  size="small"
                  onClick={onSubmit}
                >
                  {t('提交修改')}
                </ElButton>
                <ElButton size="small" onClick={onCancel}>
                  {t('取消')}
                </ElButton>
              </div>
            </>
          ) : (
            <>
              <label for="avatar-upload" class={s['camera-label']}>
                <Avatar url={url} imgClass={s.avatar} shape="square" />
                <Camera class={s.camera} stroke-width={2} />
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={onAvatarChange}
                style={{ display: 'none' }}
                id="avatar-upload"
              />
            </>
          )}
        </div>
      );
    };
  },
});

export default AvatarEdit;
