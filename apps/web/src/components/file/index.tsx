import { computed, defineComponent } from 'vue';
import styles from './index.module.sass';
import iconCatalogList from '@/public/icons/file-icons/catalog.json';

function getFileExt(filename: string) {
  if (filename.includes('.')) {
    return filename.split('.').pop()?.toLowerCase() || '';
  }
  return '';
}

function getFileIconPath(ext: string) {
  if (ext && iconCatalogList.includes(ext)) {
    return `/icons/file-icons/${ext}.svg`;
  }
  return '/icons/file-icons/unknown.svg';
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
          <img src={fileIconPath.value} alt={''} />
          <div class={styles['file-name']}>{filename}</div>
        </div>
      );
    };
  },
});
