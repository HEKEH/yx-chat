import { ElImage } from 'element-plus';
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import styles from './index.module.sass';

const CustomImage = defineComponent({
  name: 'CustomImage',
  props: ElImage.props,
  setup(props) {
    const { t } = useI18n();
    return () => {
      return (
        <ElImage
          v-slots={{
            error: () => (
              <div class={styles['image-not-found']}>
                {t('common.imageNotFound')}
              </div>
            ),
          }}
          {...props}
        />
      );
    };
  },
});

export default CustomImage;
