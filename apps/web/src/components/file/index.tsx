import { computed, defineComponent, PropType } from 'vue';
import styles from './index.module.sass';

function getFileExt(filename: string) {
  return filename.split('.').pop()?.toLowerCase() || '';
}

function getFileIconPath(ext: string) {
  return `/icons/file-icons/${ext}.svg`;
}

export const FileView = defineComponent({
  name: 'FileView',
  props: {
    filename: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const ext = computed(() => getFileExt(props.filename));
    const fileIconPath = computed(() => getFileIconPath(ext.value));
    return () => {
      const { filename } = props;
      return (
        <div class={styles['file-view']}>
          <img src={fileIconPath.value} alt={`${ext.value} icon`} />
          <div class={styles['file-name']}>{filename}</div>
        </div>
      );
    };
  },
});
