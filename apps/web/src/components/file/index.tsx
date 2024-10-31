import { computed, defineComponent, PropType } from 'vue';
import styles from './index.module.sass';

function getFileIconPath(filename: string) {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  return `/icons/file-icons/${ext}.svg`;
}

export const FileView = defineComponent({
  name: 'FileView',
  props: {
    file: {
      type: Object as PropType<File>,
      required: true,
    },
  },
  setup(props) {
    const fileIconPath = computed(() => getFileIconPath(props.file.name));
    return () => {
      const { file } = props;
      const filename = file.name;
      return (
        <div class={styles['file-view']}>
          <img src={fileIconPath.value} alt={`${file.type} icon`} />
          <div class={styles['file-name']}>{filename}</div>
        </div>
      );
    };
  },
});
