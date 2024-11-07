import { ElTooltip } from 'element-plus';
import { defineComponent, useId } from 'vue';
import { useI18n } from 'vue-i18n';
import s from './index.module.sass';
import Folder from '@/assets/icons/folder.svg';

export const FileChooseIcon = defineComponent({
  name: 'FileChooseIcon',
  props: {
    size: {
      type: Number,
    },
    iconClass: {
      type: String,
    },
  },
  emits: {
    filesChoose: (files: File[]) => true,
  },
  setup(props, { emit }) {
    const { t } = useI18n();
    const onFileChoose = (e: Event) => {
      const files = (e.target as HTMLInputElement).files;
      if (files?.length) {
        emit('filesChoose', Array.from(files));
      }
    };
    return () => {
      const fileInputId = useId();
      return (
        <ElTooltip content={t('common.chooseFile')} placement="top">
          <div class={s['file-choose-container']}>
            <label for={fileInputId} class={s['file-choose-label']}>
              <Folder
                style={{ width: props.size, height: props.size }}
                class={props.iconClass}
              />
            </label>
            <input
              type="file"
              multiple
              accept="*"
              onChange={onFileChoose}
              style={{ display: 'none' }}
              id={fileInputId}
            />
          </div>
        </ElTooltip>
      );
    };
  },
});
